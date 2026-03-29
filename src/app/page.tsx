import Link from 'next/link';
import affiliates from '@/data/affiliates.json';

const features = [
  { icon: '🧠', title: 'AI-Powered', desc: 'Advanced neural network removes backgrounds with precision — handles people, products, animals, and more.' },
  { icon: '🔒', title: '100% Private', desc: 'All processing happens in your browser. Your images are never uploaded to any server.' },
  { icon: '⚡', title: 'Instant Results', desc: 'Get results in seconds. No waiting, no queue. Works offline after first load.' },
  { icon: '🆓', title: 'Completely Free', desc: 'No sign-up, no watermark, no hidden fees. Just drop an image and go.' },
  { icon: '🎨', title: 'Multiple Backgrounds', desc: 'Transparent, white, black, blurred, or custom color — choose your perfect background.' },
  { icon: '📱', title: 'Works Everywhere', desc: 'Desktop, tablet, or phone. Any modern browser. No app download needed.' },
];

const useCases = [
  { icon: '🛒', title: 'E-commerce', desc: 'Clean product photos with white or transparent backgrounds for your online store.' },
  { icon: '📸', title: 'Profile Photos', desc: 'Create professional headshots with clean backgrounds for LinkedIn, resumes, and IDs.' },
  { icon: '🎨', title: 'Design Projects', desc: 'Extract subjects from photos for collages, presentations, and creative projects.' },
  { icon: '📱', title: 'Social Media', desc: 'Create eye-catching social posts by removing or replacing backgrounds.' },
];

const faqs = [
  { q: 'How does ClearCut remove backgrounds?', a: 'ClearCut uses a neural network (U2-Net) that runs directly in your browser using WebAssembly. It identifies the foreground subject and creates a precise mask to separate it from the background.' },
  { q: 'Is my image uploaded anywhere?', a: 'No. All processing happens locally in your browser using JavaScript and WebAssembly. Your images never leave your device. This is what makes ClearCut uniquely private.' },
  { q: 'How accurate is it compared to remove.bg?', a: 'ClearCut uses a lighter model optimized for browser use. For most images, results are very good. For professional-grade accuracy (especially with fine details like hair), server-side tools like remove.bg Pro offer higher precision.' },
  { q: 'Why is the first use slower?', a: 'The AI model (~5MB) needs to be downloaded on first use. It is then cached in your browser for instant use afterward. Subsequent uses are much faster.' },
  { q: 'What image formats are supported?', a: 'JPG, PNG, and WebP images up to 10MB. You can download results as PNG (transparent), JPG, or WebP.' },
  { q: 'Can I use this for commercial purposes?', a: 'Yes. ClearCut is free for both personal and commercial use. The processed images belong to you.' },
];

const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-purple-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Remove Backgrounds <span className="text-[--color-primary]">Instantly</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Free AI background remover — drop any image and get a clean cutout in seconds. 100% in your browser, no upload, no sign-up.
          </p>
          <div className="mt-10">
            <Link href="/background-remover" className="inline-block bg-[--color-primary] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[--color-primary-dark] shadow-lg shadow-purple-200">
              Remove Background — Free →
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>🔒 100% private</span><span>🆓 No sign-up</span><span>⚡ Instant results</span><span>🧠 AI-powered</span>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">Perfect For</h2>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map(u => (
              <div key={u.title} className="text-center">
                <div className="text-4xl mb-4">{u.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{u.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">Why ClearCut?</h2>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Tools */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">Need Professional Results?</h2>
          <p className="mt-4 text-center text-gray-600 max-w-2xl mx-auto">For HD output, batch processing, and advanced features, check out these pro tools.</p>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {affiliates.map(p => (
              <div key={p.slug} className="bg-gray-50 border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                  <span className="bg-purple-100 text-[--color-primary] text-sm font-semibold px-3 py-1 rounded-full">★ {p.rating}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{p.description}</p>
                <p className="text-[--color-primary] font-semibold mb-4">{p.price}</p>
                <a href={`/go/${p.slug}`} target="_blank" rel="noopener noreferrer nofollow" className="inline-block bg-[--color-primary] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[--color-primary-dark] text-sm">Try {p.name} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">FAQ</h2>
          <div className="space-y-4">
            {faqs.map(faq => (
              <details key={faq.q} className="bg-white rounded-xl border border-gray-200">
                <summary className="flex items-center justify-between px-6 py-5 font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer">
                  {faq.q}
                  <svg className="faq-icon w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
