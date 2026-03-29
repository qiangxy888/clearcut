'use client';

import { useState, useRef, useCallback } from 'react';
import type { ProcessingState, OutputOptions } from '@/lib/types';

const BG_OPTIONS = [
  { id: 'transparent', label: 'Transparent', icon: '🔲' },
  { id: 'white', label: 'White', icon: '⬜' },
  { id: 'black', label: 'Black', icon: '⬛' },
  { id: 'blur', label: 'Blur', icon: '🌫️' },
  { id: 'custom', label: 'Custom', icon: '🎨' },
] as const;

export default function BackgroundRemoverPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null);
  const [foregroundData, setForegroundData] = useState<ImageData | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [state, setState] = useState<ProcessingState>({ status: 'idle', progress: 0, message: '' });
  const [options, setOptions] = useState<OutputOptions>({ background: 'transparent', customColor: '#3B82F6', blurRadius: 15, format: 'png', quality: 92 });
  const [showCompare, setShowCompare] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const processImage = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) { alert('Image too large. Max 10MB.'); return; }

    // Read image
    const url = URL.createObjectURL(file);
    setOriginalImage(url);
    setResultUrl(null);
    setForegroundData(null);

    setState({ status: 'loading-model', progress: 5, message: 'Loading image...' });

    const img = new Image();
    img.onload = async () => {
      // Get image data
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      setOriginalImageData(imageData);

      try {
        // Dynamic import to avoid SSR issues
        const { removeBackground, applyBackground } = await import('@/lib/model-worker');

        const fg = await removeBackground(imageData, (msg, progress) => {
          setState({ status: progress < 100 ? 'processing' : 'done', progress, message: msg });
        });

        setForegroundData(fg);

        // Apply default background (transparent)
        const resultCanvas = applyBackground(fg, 'transparent');
        setResultUrl(resultCanvas.toDataURL('image/png'));
        setState({ status: 'done', progress: 100, message: 'Done!' });
      } catch (err) {
        console.error(err);
        setState({ status: 'error', progress: 0, message: 'Processing failed. Try a different image or browser.' });
      }
    };
    img.src = url;
  }, []);

  const applyBg = useCallback((bg: OutputOptions['background'], color?: string) => {
    if (!foregroundData) return;
    const { applyBackground } = require('@/lib/model-worker');
    const canvas = applyBackground(foregroundData, bg, originalImageData || undefined, color || options.customColor, options.blurRadius);

    const format = bg === 'transparent' ? 'image/png' : options.format === 'webp' ? 'image/webp' : options.format === 'jpg' ? 'image/jpeg' : 'image/png';
    setResultUrl(canvas.toDataURL(format, options.quality / 100));
    setOptions(prev => ({ ...prev, background: bg, ...(color ? { customColor: color } : {}) }));
  }, [foregroundData, originalImageData, options]);

  const handleDownload = () => {
    if (!resultUrl) return;
    const ext = options.background === 'transparent' ? 'png' : options.format;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = `clearcut-result.${ext}`;
    a.click();
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    dropRef.current?.classList.remove('border-[--color-primary]', 'bg-purple-50');
    const file = e.dataTransfer.files[0];
    if (file) processImage(file);
  }, [processImage]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dropRef.current?.classList.add('border-[--color-primary]', 'bg-purple-50');
  };

  const handleDragLeave = () => {
    dropRef.current?.classList.remove('border-[--color-primary]', 'bg-purple-50');
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalImageData(null);
    setForegroundData(null);
    setResultUrl(null);
    setState({ status: 'idle', progress: 0, message: '' });
  };

  const softwareSchema = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'SoftwareApplication',
    name: 'ClearCut - Free AI Background Remover',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: softwareSchema }} />

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Background Remover</h1>
          <p className="mt-1 text-gray-600">Remove backgrounds from images using AI — 100% in your browser, no upload needed.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Area */}
        {state.status === 'idle' && (
          <div
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileRef.current?.click()}
            className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center cursor-pointer hover:border-[--color-primary] hover:bg-purple-50 transition-colors"
          >
            <div className="text-6xl mb-4">📸</div>
            <h2 className="text-xl font-bold text-gray-900">Drop your image here</h2>
            <p className="mt-2 text-gray-500">or click to browse (JPG, PNG, WebP — max 10MB)</p>
            <p className="mt-4 text-xs text-gray-400">🔒 Your image stays on your device. Nothing is uploaded.</p>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && processImage(e.target.files[0])} />
          </div>
        )}

        {/* Processing */}
        {(state.status === 'loading-model' || state.status === 'processing') && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="text-center mb-6">
              <div className="analyzing-pulse text-5xl mb-4">✂️</div>
              <p className="text-lg font-semibold text-gray-700">{state.message}</p>
              <p className="mt-2 text-sm text-gray-500">
                {state.status === 'loading-model' ? 'First time may take 10-20 seconds to download the AI model (~5MB). It will be cached for instant use next time.' : 'Processing happens entirely in your browser.'}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="h-3 rounded-full bg-[--color-primary] transition-all duration-500" style={{ width: `${state.progress}%` }} />
            </div>
            <p className="mt-2 text-center text-sm text-gray-500">{state.progress}%</p>

            {/* Affiliate during loading */}
            <div className="mt-8 bg-purple-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-600">
                For professional-grade removal, try <a href="/go/removebg" target="_blank" rel="noopener noreferrer nofollow" className="text-[--color-primary] font-semibold hover:underline">remove.bg Pro</a> — 99% accuracy with HD output
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {state.status === 'error' && (
          <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
            <div className="text-5xl mb-4">❌</div>
            <p className="text-lg font-semibold text-red-700">{state.message}</p>
            <button onClick={handleReset} className="mt-4 px-6 py-2 bg-[--color-primary] text-white rounded-lg font-semibold hover:bg-[--color-primary-dark]">Try Again</button>
          </div>
        )}

        {/* Result */}
        {state.status === 'done' && resultUrl && (
          <div className="space-y-6">
            {/* Image Preview */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Result</h2>
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowCompare(!showCompare)} className="text-sm text-gray-500 hover:text-[--color-primary]">
                    {showCompare ? '✨ Show Result' : '👁 Compare'}
                  </button>
                  <button onClick={handleReset} className="text-sm text-gray-500 hover:text-red-500">✕ New Image</button>
                </div>
              </div>

              <div className={`rounded-xl overflow-hidden ${options.background === 'transparent' ? 'checkerboard' : 'bg-gray-100'}`}>
                <img
                  src={showCompare ? originalImage! : resultUrl}
                  alt={showCompare ? 'Original' : 'Background removed'}
                  className="w-full max-h-[500px] object-contain"
                />
              </div>
            </div>

            {/* Background Options */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Background</h3>
              <div className="flex flex-wrap gap-3">
                {BG_OPTIONS.map(bg => (
                  <button key={bg.id} onClick={() => applyBg(bg.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${options.background === bg.id ? 'bg-[--color-primary] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    <span>{bg.icon}</span> {bg.label}
                  </button>
                ))}
                {options.background === 'custom' && (
                  <input type="color" value={options.customColor} onChange={e => applyBg('custom', e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer" />
                )}
              </div>
            </div>

            {/* Download */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={handleDownload} className="flex-1 px-8 py-4 bg-[--color-primary] text-white rounded-xl font-semibold text-lg hover:bg-[--color-primary-dark] shadow-lg shadow-purple-200">
                ⬇️ Download {options.background === 'transparent' ? 'PNG' : options.format.toUpperCase()}
              </button>
              <button onClick={() => fileRef.current?.click()} className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-[--color-primary]">
                📸 New Image
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && processImage(e.target.files[0])} />
            </div>

            {/* Affiliate CTA */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6 text-center">
              <p className="text-lg font-bold text-gray-900">Need HD Quality or Batch Processing?</p>
              <p className="mt-2 text-gray-600 text-sm">Professional tools use server-side AI for higher resolution and better edge detection.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <a href="/go/removebg" target="_blank" rel="noopener noreferrer nofollow" className="px-5 py-2 bg-[--color-primary] text-white rounded-lg text-sm font-semibold hover:bg-[--color-primary-dark]">remove.bg Pro →</a>
                <a href="/go/canva" target="_blank" rel="noopener noreferrer nofollow" className="px-5 py-2 bg-white text-[--color-primary] border-2 border-[--color-primary] rounded-lg text-sm font-semibold hover:bg-purple-50">Canva Pro →</a>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-sm text-green-800">🔒 <strong>100% Private:</strong> All AI processing happens in your browser. Your images are never uploaded to any server.</p>
        </div>
      </div>
    </div>
  );
}
