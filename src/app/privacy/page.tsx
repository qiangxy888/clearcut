import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'ClearCut privacy policy — your images never leave your device.' };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-lg prose-purple max-w-none text-gray-700">
        <p><strong>Last updated:</strong> March 2026</p>
        <h2>Image Data</h2>
        <p><strong>We do not collect, store, or transmit any images you process.</strong> All AI processing happens entirely in your browser using WebAssembly. Your images never leave your device.</p>
        <h2>AI Model</h2>
        <p>The AI model (~5MB) is downloaded once from our CDN and cached in your browser. Only the model file is downloaded — your images are never sent anywhere.</p>
        <h2>Analytics</h2>
        <p>We may use analytics to understand website usage (page views, traffic sources). No image data is ever collected.</p>
        <h2>Affiliate Links</h2>
        <p>Our site contains affiliate links to professional background removal tools. We earn commissions on purchases at no extra cost to you.</p>
      </div>
    </div>
  );
}
