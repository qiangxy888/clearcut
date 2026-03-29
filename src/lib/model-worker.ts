/**
 * Background removal using ONNX Runtime Web
 * Uses a lightweight U2-Net model for browser-side inference
 */

const MODEL_URL = 'https://huggingface.co/nicball/onnx-u2netp/resolve/main/u2netp.onnx';
const MODEL_SIZE = 4_700_000; // ~4.7MB
const INPUT_SIZE = 320;
const MAX_IMAGE_PIXELS = 4096 * 4096; // 16MP max to prevent OOM
const MODEL_DOWNLOAD_TIMEOUT = 60_000; // 60s timeout

// Use proper typing for ONNX session
type OrtSession = Awaited<ReturnType<typeof import('onnxruntime-web').InferenceSession.create>>;
let sessionPromise: Promise<OrtSession> | null = null;

// ===== IndexedDB Cache =====
async function getCachedModel(): Promise<ArrayBuffer | null> {
  try {
    return await new Promise((resolve) => {
      const req = indexedDB.open('clearcut-models', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('models');
      req.onsuccess = () => {
        const tx = req.result.transaction('models', 'readonly');
        const get = tx.objectStore('models').get('u2netp');
        get.onsuccess = () => resolve(get.result || null);
        get.onerror = () => resolve(null);
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function cacheModel(data: ArrayBuffer): Promise<void> {
  try {
    await new Promise<void>((resolve) => {
      const req = indexedDB.open('clearcut-models', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('models');
      req.onsuccess = () => {
        const tx = req.result.transaction('models', 'readwrite');
        tx.objectStore('models').put(data, 'u2netp');
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      };
      req.onerror = () => resolve();
    });
  } catch { /* ignore */ }
}

// ===== Model Loading =====
async function loadModel(onProgress?: (p: number) => void): Promise<OrtSession> {
  const ort = await import('onnxruntime-web');

  // Try cache first
  let modelData = await getCachedModel();

  if (!modelData) {
    // Download with progress + timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), MODEL_DOWNLOAD_TIMEOUT);

    try {
      const response = await fetch(MODEL_URL, { signal: controller.signal });
      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to fetch model');

      const chunks: Uint8Array[] = [];
      let loaded = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        onProgress?.(Math.min(90, (loaded / MODEL_SIZE) * 80));
      }

      // Combine chunks into single buffer
      const totalSize = chunks.reduce((acc, c) => acc + c.length, 0);
      const fullArray = new Uint8Array(totalSize);
      let offset = 0;
      for (const chunk of chunks) {
        fullArray.set(chunk, offset);
        offset += chunk.length;
      }
      modelData = fullArray.buffer;

      await cacheModel(modelData);
    } finally {
      clearTimeout(timeoutId);
    }
  } else {
    onProgress?.(80);
  }

  onProgress?.(90);
  const session = await ort.InferenceSession.create(modelData, {
    executionProviders: ['wasm'],
    graphOptimizationLevel: 'all',
  });
  onProgress?.(100);

  return session;
}

function getSession(onProgress?: (p: number) => void): Promise<OrtSession> {
  if (!sessionPromise) {
    sessionPromise = loadModel(onProgress).catch((err) => {
      // Reset on failure so next attempt retries
      sessionPromise = null;
      throw err;
    });
  }
  return sessionPromise;
}

/** Release ONNX session to free WASM memory */
export async function disposeSession(): Promise<void> {
  if (sessionPromise) {
    try {
      const session = await sessionPromise;
      await session.release();
    } catch { /* ignore */ }
    sessionPromise = null;
  }
}

// ===== Image Processing =====

/** Create a canvas (OffscreenCanvas if available, fallback for Safari <16.4) */
function createCanvas(w: number, h: number): OffscreenCanvas | HTMLCanvasElement {
  if (typeof OffscreenCanvas !== 'undefined') {
    return new OffscreenCanvas(w, h);
  }
  // Safari fallback
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

function preprocessImage(imageData: ImageData): Float32Array {
  const { width, height } = imageData;
  const tensor = new Float32Array(3 * INPUT_SIZE * INPUT_SIZE);

  const canvas = createCanvas(INPUT_SIZE, INPUT_SIZE);
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  const tmpCanvas = createCanvas(width, height);
  const tmpCtx = tmpCanvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  tmpCtx.putImageData(imageData, 0, 0);
  ctx.drawImage(tmpCanvas as CanvasImageSource, 0, 0, INPUT_SIZE, INPUT_SIZE);

  const resized = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
  const pixels = resized.data;

  // ImageNet normalization (NCHW format)
  const mean = [0.485, 0.456, 0.406];
  const std = [0.229, 0.224, 0.225];

  for (let i = 0; i < INPUT_SIZE * INPUT_SIZE; i++) {
    tensor[i] = (pixels[i * 4] / 255 - mean[0]) / std[0];
    tensor[INPUT_SIZE * INPUT_SIZE + i] = (pixels[i * 4 + 1] / 255 - mean[1]) / std[1];
    tensor[2 * INPUT_SIZE * INPUT_SIZE + i] = (pixels[i * 4 + 2] / 255 - mean[2]) / std[2];
  }

  return tensor;
}

function postprocessMask(output: Float32Array, origWidth: number, origHeight: number): ImageData {
  let min = Infinity, max = -Infinity;
  for (let i = 0; i < output.length; i++) {
    if (output[i] < min) min = output[i];
    if (output[i] > max) max = output[i];
  }
  const range = max - min || 1;

  const maskCanvas = createCanvas(INPUT_SIZE, INPUT_SIZE);
  const maskCtx = maskCanvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  const maskData = maskCtx.createImageData(INPUT_SIZE, INPUT_SIZE);

  for (let i = 0; i < INPUT_SIZE * INPUT_SIZE; i++) {
    const val = Math.round(((output[i] - min) / range) * 255);
    maskData.data[i * 4] = val;
    maskData.data[i * 4 + 1] = val;
    maskData.data[i * 4 + 2] = val;
    maskData.data[i * 4 + 3] = 255;
  }
  maskCtx.putImageData(maskData, 0, 0);

  const outCanvas = createCanvas(origWidth, origHeight);
  const outCtx = outCanvas.getContext('2d') as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  outCtx.drawImage(maskCanvas as CanvasImageSource, 0, 0, origWidth, origHeight);

  return outCtx.getImageData(0, 0, origWidth, origHeight);
}

// ===== Main API =====

export async function removeBackground(
  imageData: ImageData,
  onProgress?: (status: string, progress: number) => void
): Promise<ImageData> {
  // Guard: prevent OOM on huge images
  const pixels = imageData.width * imageData.height;
  if (pixels > MAX_IMAGE_PIXELS) {
    throw new Error(`Image too large (${Math.round(pixels / 1_000_000)}MP). Max is ${Math.round(MAX_IMAGE_PIXELS / 1_000_000)}MP.`);
  }

  const ort = await import('onnxruntime-web');

  onProgress?.('Loading AI model...', 10);
  const session = await getSession((p) => onProgress?.('Loading AI model...', p * 0.5));

  onProgress?.('Analyzing image...', 55);
  const inputTensor = preprocessImage(imageData);

  onProgress?.('Removing background...', 65);
  const feeds = { [session.inputNames[0]]: new ort.Tensor('float32', inputTensor, [1, 3, INPUT_SIZE, INPUT_SIZE]) };
  const results = await session.run(feeds);

  const outputKey = session.outputNames[0];
  const outputData = results[outputKey].data as Float32Array;

  onProgress?.('Refining edges...', 85);
  const mask = postprocessMask(outputData, imageData.width, imageData.height);

  onProgress?.('Finalizing...', 95);
  const result = new ImageData(imageData.width, imageData.height);
  for (let i = 0; i < pixels; i++) {
    result.data[i * 4] = imageData.data[i * 4];
    result.data[i * 4 + 1] = imageData.data[i * 4 + 1];
    result.data[i * 4 + 2] = imageData.data[i * 4 + 2];
    result.data[i * 4 + 3] = mask.data[i * 4];
  }

  onProgress?.('Done!', 100);
  return result;
}

export function applyBackground(
  foreground: ImageData,
  mode: 'transparent' | 'white' | 'black' | 'custom' | 'blur',
  originalImageData?: ImageData,
  customColor?: string,
  blurRadius?: number,
): HTMLCanvasElement {
  const w = foreground.width;
  const h = foreground.height;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  if (mode === 'white') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
  } else if (mode === 'black') {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, w, h);
  } else if (mode === 'custom' && customColor) {
    ctx.fillStyle = customColor;
    ctx.fillRect(0, 0, w, h);
  } else if (mode === 'blur' && originalImageData) {
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = w;
    tmpCanvas.height = h;
    tmpCanvas.getContext('2d')!.putImageData(originalImageData, 0, 0);
    ctx.filter = `blur(${blurRadius || 15}px)`;
    ctx.drawImage(tmpCanvas, 0, 0);
    ctx.filter = 'none';
  }

  const fgCanvas = document.createElement('canvas');
  fgCanvas.width = w;
  fgCanvas.height = h;
  fgCanvas.getContext('2d')!.putImageData(foreground, 0, 0);
  ctx.drawImage(fgCanvas, 0, 0);

  return canvas;
}
