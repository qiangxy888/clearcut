import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'About ClearCut', description: 'Learn about ClearCut — free AI background remover that runs in your browser.' };

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">About ClearCut</h1>
      <div className="prose prose-lg prose-purple max-w-none text-gray-700">
        <p>ClearCut is a free AI-powered background remover that processes images entirely in your browser.</p>
        <h2>How It Works</h2>
        <p>We use a neural network called U2-Net, converted to ONNX format and executed via WebAssembly in your browser. The model analyzes each image to identify the foreground subject and create a precise mask.</p>
        <h2>Privacy First</h2>
        <p><strong>Your images never leave your device.</strong> Unlike cloud-based tools, ClearCut runs 100% locally. This makes it ideal for sensitive images — ID photos, company assets, personal photos.</p>
        <h2>Limitations</h2>
        <p>Browser-based AI is lighter than server-side models. For complex images (fine hair details, transparent objects), professional tools like remove.bg may produce better results.</p>
        <h2>Revenue</h2>
        <p>ClearCut is free. We earn commissions when you click through to recommended professional tools.</p>
      </div>
    </div>
  );
}
