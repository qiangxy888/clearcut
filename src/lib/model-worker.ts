/**
 * Background removal using ONNX Runtime Web
 * Uses a lightweight U2-Net model for browser-side inference
 */

// Model URL - using a quantized model for faster loading
const MODEL_URL = 'https://huggingface.co/nicball/onnx-u2netp/resolve/main/u2netp.onnx';
const MODEL_SIZE = 4_700_000; // ~4.7MB for u2netp (lightweight version)
const INPUT_SIZE = 320; // Model input resolution

let sessionPromise: Promise<any> | null = null;

/**
 * Cache model in IndexedDB for instant second-use
 */
async function getCachedModel(): Promise<ArrayBuffer | null> {
  try {
    return await new Promise((resolve, reject) => {
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
    await new Promise<void>((resolve, reject) => {
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
  } catch { /* ignore cache errors */ }
}

/**
 * Load the ONNX model, using cache if available
 */
async function loadModel(onProgress?: (p: number) => void): Promise<any> {
  const ort = await import('onnxruntime-web');
  
  // Try cached model first
  let modelData = await getCachedModel();
  
  if (!modelData) {
    // Download model with progress
    const response = await fetch(MODEL_URL);
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
    
    modelData = new Uint8Array(chunks.reduce((acc, c) => acc + c.length, 0)).buffer;
    let offset = 0;
    const fullArray = new Uint8Array(modelData);
    for (const chunk of chunks) {
      fullArray.set(chunk, offset);
      offset += chunk.length;
    }
    
    // Cache for next time
    await cacheModel(modelData);
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

/**
 * Get or create the model session (singleton)
 */
function getSession(onProgress?: (p: number) => void): Promise<any> {
  if (!sessionPromise) {
    sessionPromise = loadModel(onProgress);
  }
  return sessionPromise;
}

/**
 * Preprocess image for model input
 */
function preprocessImage(imageData: ImageData): Float32Array {
  const { width, height, data } = imageData;
  const tensor = new Float32Array(3 * INPUT_SIZE * INPUT_SIZE);
  
  // Create a temporary canvas to resize
  const canvas = new OffscreenCanvas(INPUT_SIZE, INPUT_SIZE);
  const ctx = canvas.getContext('2d')!;
  const tmpCanvas = new OffscreenCanvas(width, height);
  const tmpCtx = tmpCanvas.getContext('2d')!;
  tmpCtx.putImageData(imageData, 0, 0);
  ctx.drawImage(tmpCanvas, 0, 0, INPUT_SIZE, INPUT_SIZE);
  
  const resized = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
  const pixels = resized.data;
  
  // Normalize to [0, 1] and split into RGB channels (NCHW format)
  const mean = [0.485, 0.456, 0.406];
  const std = [0.229, 0.224, 0.225];
  
  for (let i = 0; i < INPUT_SIZE * INPUT_SIZE; i++) {
    tensor[i] = (pixels[i * 4] / 255 - mean[0]) / std[0];                           // R
    tensor[INPUT_SIZE * INPUT_SIZE + i] = (pixels[i * 4 + 1] / 255 - mean[1]) / std[1]; // G
    tensor[2 * INPUT_SIZE * INPUT_SIZE + i] = (pixels[i * 4 + 2] / 255 - mean[2]) / std[2]; // B
  }
  
  return tensor;
}

/**
 * Post-process model output to get alpha mask
 */
function postprocessMask(output: Float32Array, origWidth: number, origHeight: number): ImageData {
  // Find min/max for normalization
  let min = Infinity, max = -Infinity;
  for (let i = 0; i < output.length; i++) {
    if (output[i] < min) min = output[i];
    if (output[i] > max) max = output[i];
  }
  const range = max - min || 1;
  
  // Create mask at model resolution
  const maskCanvas = new OffscreenCanvas(INPUT_SIZE, INPUT_SIZE);
  const maskCtx = maskCanvas.getContext('2d')!;
  const maskData = maskCtx.createImageData(INPUT_SIZE, INPUT_SIZE);
  
  for (let i = 0; i < INPUT_SIZE * INPUT_SIZE; i++) {
    const val = Math.round(((output[i] - min) / range) * 255);
    maskData.data[i * 4] = val;
    maskData.data[i * 4 + 1] = val;
    maskData.data[i * 4 + 2] = val;
    maskData.data[i * 4 + 3] = 255;
  }
  maskCtx.putImageData(maskData, 0, 0);
  
  // Resize mask to original image size
  const outCanvas = new OffscreenCanvas(origWidth, origHeight);
  const outCtx = outCanvas.getContext('2d')!;
  outCtx.drawImage(maskCanvas, 0, 0, origWidth, origHeight);
  
  return outCtx.getImageData(0, 0, origWidth, origHeight);
}

/**
 * Main function: remove background from an image
 */
export async function removeBackground(
  imageData: ImageData,
  onProgress?: (status: string, progress: number) => void
): Promise<ImageData> {
  const ort = await import('onnxruntime-web');
  
  // Load model
  onProgress?.('Loading AI model...', 10);
  const session = await getSession((p) => onProgress?.('Loading AI model...', p * 0.5));
  
  // Preprocess
  onProgress?.('Analyzing image...', 55);
  const inputTensor = preprocessImage(imageData);
  
  // Run inference
  onProgress?.('Removing background...', 65);
  const feeds = { [session.inputNames[0]]: new ort.Tensor('float32', inputTensor, [1, 3, INPUT_SIZE, INPUT_SIZE]) };
  const results = await session.run(feeds);
  
  // Get the first output (main prediction)
  const outputKey = session.outputNames[0];
  const outputData = results[outputKey].data as Float32Array;
  
  // Postprocess
  onProgress?.('Refining edges...', 85);
  const mask = postprocessMask(outputData, imageData.width, imageData.height);
  
  // Apply mask to original image
  onProgress?.('Finalizing...', 95);
  const result = new ImageData(imageData.width, imageData.height);
  for (let i = 0; i < imageData.width * imageData.height; i++) {
    result.data[i * 4] = imageData.data[i * 4];       // R
    result.data[i * 4 + 1] = imageData.data[i * 4 + 1]; // G
    result.data[i * 4 + 2] = imageData.data[i * 4 + 2]; // B
    result.data[i * 4 + 3] = mask.data[i * 4];          // Alpha from mask
  }
  
  onProgress?.('Done!', 100);
  return result;
}

/**
 * Apply a background to the processed image
 */
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
  
  // Draw background
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
    // Draw original blurred
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = w;
    tmpCanvas.height = h;
    const tmpCtx = tmpCanvas.getContext('2d')!;
    tmpCtx.putImageData(originalImageData, 0, 0);
    ctx.filter = `blur(${blurRadius || 15}px)`;
    ctx.drawImage(tmpCanvas, 0, 0);
    ctx.filter = 'none';
  }
  // else transparent - nothing to draw
  
  // Draw foreground on top
  const fgCanvas = document.createElement('canvas');
  fgCanvas.width = w;
  fgCanvas.height = h;
  fgCanvas.getContext('2d')!.putImageData(foreground, 0, 0);
  ctx.drawImage(fgCanvas, 0, 0);
  
  return canvas;
}
