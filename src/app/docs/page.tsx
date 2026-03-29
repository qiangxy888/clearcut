import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'API Documentation — ClearCut Background Removal API',
  description: 'Remove image backgrounds programmatically with ClearCut API. Simple REST API, 50 free images/month.',
};

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/" className="text-[--color-primary] hover:underline text-sm">← Home</Link>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">API Documentation</h1>
      <p className="text-lg text-gray-600 mb-8">Remove image backgrounds programmatically. Simple REST API, fast processing, transparent PNGs.</p>

      {/* Quick Start */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
        <div className="bg-gray-900 rounded-xl p-6 text-sm font-mono overflow-x-auto">
          <p className="text-gray-400"># Remove background with cURL</p>
          <p className="text-green-400 mt-2">curl -X POST https://clearcut.tools/api/remove-bg \</p>
          <p className="text-green-400">  -H &quot;Authorization: Bearer YOUR_API_KEY&quot; \</p>
          <p className="text-green-400">  -F &quot;image=@photo.jpg&quot; \</p>
          <p className="text-green-400">  -o result.png</p>
        </div>
      </section>

      {/* Authentication */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h2>
        <p className="text-gray-600 mb-4">Include your API key in every request:</p>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm">
          <p>Authorization: Bearer cc_your_api_key_here</p>
          <p className="text-gray-400 mt-1"># or</p>
          <p>X-Api-Key: cc_your_api_key_here</p>
        </div>
      </section>

      {/* Endpoints */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Endpoints</h2>

        {/* POST /api/remove-bg */}
        <div className="border border-gray-200 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">POST</span>
            <code className="text-lg font-semibold">/api/remove-bg</code>
          </div>
          <p className="text-gray-600 mb-4">Remove the background from an image. Returns a transparent PNG.</p>

          <h4 className="font-semibold text-gray-900 mb-2">Input Methods (choose one)</h4>
          <table className="w-full text-sm mb-4">
            <thead><tr className="border-b"><th className="text-left py-2">Method</th><th className="text-left py-2">Content-Type</th><th className="text-left py-2">Body</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="py-2">File upload</td><td><code>multipart/form-data</code></td><td>Field: <code>image</code></td></tr>
              <tr className="border-b"><td className="py-2">Image URL</td><td><code>application/json</code></td><td><code>{`{"image_url": "https://..."}`}</code></td></tr>
              <tr><td className="py-2">Raw binary</td><td><code>image/jpeg</code> etc.</td><td>Image bytes</td></tr>
            </tbody>
          </table>

          <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
          <p className="text-gray-600 text-sm mb-2">Success: <code>200</code> with <code>image/png</code> body</p>
          <p className="text-gray-600 text-sm">Headers: <code>X-Processing-Time-Ms</code>, <code>X-Remaining-Credits</code></p>

          <h4 className="font-semibold text-gray-900 mt-4 mb-2">Limits</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Max file size: <strong>10MB</strong></li>
            <li>• Max dimensions: <strong>4096×4096</strong></li>
            <li>• Supported formats: JPEG, PNG, WebP</li>
            <li>• Processing time: 1-5 seconds</li>
          </ul>
        </div>

        {/* GET /api/usage */}
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">GET</span>
            <code className="text-lg font-semibold">/api/usage</code>
          </div>
          <p className="text-gray-600 mb-4">Check your current usage and remaining credits.</p>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            <p className="text-gray-400">Response:</p>
            <pre className="text-gray-800 mt-1">{`{
  "plan": "free",
  "used": 12,
  "limit": 50,
  "remaining": 38
}`}</pre>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Code Examples</h2>

        <h3 className="font-semibold text-gray-900 mb-2">Python</h3>
        <div className="bg-gray-900 rounded-xl p-4 text-sm font-mono text-green-400 overflow-x-auto mb-4">
          <pre>{`import requests

response = requests.post(
    "https://clearcut.tools/api/remove-bg",
    headers={"Authorization": "Bearer cc_your_key"},
    files={"image": open("photo.jpg", "rb")}
)

with open("result.png", "wb") as f:
    f.write(response.content)`}</pre>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2">JavaScript / Node.js</h3>
        <div className="bg-gray-900 rounded-xl p-4 text-sm font-mono text-green-400 overflow-x-auto mb-4">
          <pre>{`const form = new FormData();
form.append("image", fs.createReadStream("photo.jpg"));

const res = await fetch("https://clearcut.tools/api/remove-bg", {
  method: "POST",
  headers: { "Authorization": "Bearer cc_your_key" },
  body: form,
});

fs.writeFileSync("result.png", Buffer.from(await res.arrayBuffer()));`}</pre>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2">cURL (URL input)</h3>
        <div className="bg-gray-900 rounded-xl p-4 text-sm font-mono text-green-400 overflow-x-auto">
          <pre>{`curl -X POST https://clearcut.tools/api/remove-bg \\
  -H "Authorization: Bearer cc_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{"image_url": "https://example.com/photo.jpg"}' \\
  -o result.png`}</pre>
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">API Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 text-lg">Free</h3>
            <p className="text-3xl font-extrabold mt-2">$0</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>✓ 50 images/month</li>
              <li>✓ All input methods</li>
              <li>✓ PNG output</li>
              <li>✓ No watermark</li>
            </ul>
          </div>
          <div className="border-2 border-[--color-primary] rounded-xl p-6">
            <h3 className="font-bold text-[--color-primary] text-lg">Pro</h3>
            <p className="text-3xl font-extrabold mt-2">$9.90<span className="text-sm font-normal text-gray-500">/month</span></p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>✓ 5,000 images/month</li>
              <li>✓ Priority processing</li>
              <li>✓ HD output (up to 4096px)</li>
              <li>✓ Email support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Errors */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Codes</h2>
        <table className="w-full text-sm">
          <thead><tr className="border-b"><th className="text-left py-2">Code</th><th className="text-left py-2">Meaning</th></tr></thead>
          <tbody>
            <tr className="border-b"><td className="py-2"><code>400</code></td><td>Bad request (invalid image, too large, missing input)</td></tr>
            <tr className="border-b"><td className="py-2"><code>401</code></td><td>Invalid or missing API key</td></tr>
            <tr className="border-b"><td className="py-2"><code>429</code></td><td>Monthly quota exceeded</td></tr>
            <tr><td className="py-2"><code>500</code></td><td>Processing error</td></tr>
          </tbody>
        </table>
      </section>

      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Get Your Free API Key</h2>
        <p className="mt-3 text-gray-600">50 images/month, no credit card required.</p>
        <Link href="/background-remover" className="mt-6 inline-block bg-[--color-primary] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[--color-primary-dark]">
          Try the Tool First →
        </Link>
      </div>
    </div>
  );
}
