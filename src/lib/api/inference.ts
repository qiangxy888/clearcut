/**
 * Server-side background removal using ONNX Runtime Node
 * Processes images via Sharp for resize + ONNX for inference
 */
import * as ort from 'onnxruntime-node';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const MODEL_URL = 'https://huggingface.co/nicball/onnx-u2netp/resolve/main/u2netp.onnx';
const MODEL_PATH = path.join(process.cwd(), 'models', 'u2netp.onnx');
const INPUT_SIZE = 320;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_DIMENSION = 4096;

let sessionPromise: Promise<ort.InferenceSession> | null = null;

/** Download model if not cached locally */
async function ensureModel(): Promise<string> {
  if (fs.existsSync(MODEL_PATH)) return MODEL_PATH;

  const dir = path.dirname(MODEL_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.log('Downloading U2-Net model...');
  const res = await fetch(MODEL_URL);
  if (!res.ok) throw new Error(`Failed to download model: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(MODEL_PATH, buffer);
  console.log(`Model saved to ${MODEL_PATH} (${(buffer.length / 1024 / 1024).toFixed(1)}MB)`);
  return MODEL_PATH;
}

/** Get or create ONNX session (singleton) */
async function getSession(): Promise<ort.InferenceSession> {
  if (!sessionPromise) {
    sessionPromise = (async () => {
      const modelPath = await ensureModel();
      return ort.InferenceSession.create(modelPath, {
        executionProviders: ['cpu'],
        graphOptimizationLevel: 'all',
      });
    })();
  }
  return sessionPromise;
}

/** Preprocess: resize to 320x320, normalize with ImageNet stats */
async function preprocess(imageBuffer: Buffer): Promise<{ tensor: Float32Array; width: number; height: number }> {
  const metadata = await sharp(imageBuffer).metadata();
  const width = metadata.width || 0;
  const height = metadata.height || 0;

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    throw new Error(`Image too large: ${width}x${height}. Max ${MAX_DIMENSION}x${MAX_DIMENSION}.`);
  }

  // Resize to model input
  const resized = await sharp(imageBuffer)
    .resize(INPUT_SIZE, INPUT_SIZE, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer();

  const tensor = new Float32Array(3 * INPUT_SIZE * INPUT_SIZE);
  const mean = [0.485, 0.456, 0.406];
  const std = [0.229, 0.224, 0.225];

  for (let i = 0; i < INPUT_SIZE * INPUT_SIZE; i++) {
    tensor[i] = (resized[i * 3] / 255 - mean[0]) / std[0];
    tensor[INPUT_SIZE * INPUT_SIZE + i] = (resized[i * 3 + 1] / 255 - mean[1]) / std[1];
    tensor[2 * INPUT_SIZE * INPUT_SIZE + i] = (resized[i * 3 + 2] / 255 - mean[2]) / std[2];
  }

  return { tensor, width, height };
}

/** Postprocess: normalize output, resize mask to original size */
async function postprocess(output: Float32Array, origWidth: number, origHeight: number): Promise<Buffer> {
  // Normalize to 0-255
  let min = Infinity, max = -Infinity;
  for (let i = 0; i < output.length; i++) {
    if (output[i] < min) min = output[i];
    if (output[i] > max) max = output[i];
  }
  const range = max - min || 1;

  const maskData = Buffer.alloc(INPUT_SIZE * INPUT_SIZE);
  for (let i = 0; i < INPUT_SIZE * INPUT_SIZE; i++) {
    maskData[i] = Math.round(((output[i] - min) / range) * 255);
  }

  // Resize mask to original dimensions
  const mask = await sharp(maskData, { raw: { width: INPUT_SIZE, height: INPUT_SIZE, channels: 1 } })
    .resize(origWidth, origHeight)
    .toBuffer();

  return mask;
}

/** Main API: remove background, return PNG buffer */
export async function removeBackgroundServer(imageBuffer: Buffer): Promise<Buffer> {
  if (imageBuffer.length > MAX_IMAGE_SIZE) {
    throw new Error(`Image too large: ${(imageBuffer.length / 1024 / 1024).toFixed(1)}MB. Max 10MB.`);
  }

  const session = await getSession();
  const { tensor, width, height } = await preprocess(imageBuffer);

  // Run inference
  const inputTensor = new ort.Tensor('float32', tensor, [1, 3, INPUT_SIZE, INPUT_SIZE]);
  const feeds: Record<string, ort.Tensor> = { [session.inputNames[0]]: inputTensor };
  const results = await session.run(feeds);
  const outputData = results[session.outputNames[0]].data as Float32Array;

  // Get mask
  const mask = await postprocess(outputData, width, height);

  // Apply mask as alpha channel to original image
  const result = await sharp(imageBuffer)
    .resize(width, height)
    .ensureAlpha()
    .raw()
    .toBuffer();

  // Composite: keep RGB, replace alpha with mask
  const pixels = width * height;
  const output = Buffer.alloc(pixels * 4);
  for (let i = 0; i < pixels; i++) {
    output[i * 4] = result[i * 4];       // R
    output[i * 4 + 1] = result[i * 4 + 1]; // G
    output[i * 4 + 2] = result[i * 4 + 2]; // B
    output[i * 4 + 3] = mask[i];           // A from model
  }

  return sharp(output, { raw: { width, height, channels: 4 } })
    .png()
    .toBuffer();
}
