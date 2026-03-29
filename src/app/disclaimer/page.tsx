import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Disclaimer', description: 'ClearCut disclaimer and affiliate disclosure.' };

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Disclaimer</h1>
      <div className="prose prose-lg prose-purple max-w-none text-gray-700">
        <h2>Accuracy</h2>
        <p>ClearCut uses a lightweight AI model for browser-based processing. Results may not be as accurate as server-side professional tools, especially for complex images with fine details.</p>
        <h2>Affiliate Disclosure</h2>
        <p>ClearCut participates in affiliate programs with remove.bg, Canva, Adobe, and other tools. When you click links and make purchases, we may earn a commission at no additional cost to you.</p>
        <h2>No Warranty</h2>
        <p>This tool is provided &quot;as is&quot; without warranty. We make no guarantees about the quality of background removal results.</p>
      </div>
    </div>
  );
}
