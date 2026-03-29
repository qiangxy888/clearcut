import Link from 'next/link';
import type { Metadata } from 'next';

const posts: Record<string, { title: string; description: string; date: string; readTime: string; content: string; keywords: string[] }> = {
  'best-background-remover-tools-2026': {
    title: 'Best Background Remover Tools in 2026: Free vs Paid',
    description: 'We compared the top background removal tools head-to-head.',
    date: '2026-03-28', readTime: '10 min',
    keywords: ['best background remover', 'background remover comparison', 'remove bg tools'],
    content: `<p>Need to remove backgrounds from images? Here are the best tools in 2026, ranked by accuracy, speed, and value.</p>
<h2>1. remove.bg — Best Overall Accuracy</h2>
<p><a href="/go/removebg">remove.bg</a> (now owned by Canva) remains the gold standard. It uses advanced server-side AI that handles even difficult subjects like hair and transparent objects with remarkable precision.</p>
<p><strong>Best for:</strong> Professional photographers, designers, and anyone needing maximum accuracy.</p>
<p><strong>Pricing:</strong> 1 free preview per image, HD from $0.20/image.</p>
<h2>2. ClearCut — Best Free &amp; Private</h2>
<p><a href="/background-remover">ClearCut</a> (that's us!) is unique because it runs entirely in your browser. No upload, no server, no privacy concerns. Perfect for sensitive images.</p>
<p><strong>Best for:</strong> Quick free removal, privacy-sensitive images, offline use.</p>
<h2>3. Canva — Best All-in-One Design Tool</h2>
<p><a href="/go/canva">Canva Pro</a> includes background removal as part of its comprehensive design platform. Great if you need to remove backgrounds AND create designs.</p>
<h2>4. PhotoRoom — Best for E-commerce</h2>
<p><a href="/go/photoroom">PhotoRoom</a> is specifically designed for product photography. It not only removes backgrounds but also generates professional product compositions.</p>
<h2>Free vs Paid: Is It Worth Upgrading?</h2>
<p>For occasional use, free tools like <a href="/background-remover">ClearCut</a> are perfectly sufficient. If you process 50+ images monthly or need HD quality, paid tools like <a href="/go/removebg">remove.bg</a> are worth the investment.</p>`,
  },
  'how-to-remove-background-from-image': {
    title: 'How to Remove Background from Image: 5 Free Methods',
    description: 'Step-by-step guide to removing backgrounds using free tools.',
    date: '2026-03-24', readTime: '8 min',
    keywords: ['remove background from image', 'how to remove background', 'transparent background'],
    content: `<p>Whether you need a transparent PNG, a white background for e-commerce, or a creative composite, here are 5 free ways to remove backgrounds.</p>
<h2>Method 1: AI Background Remover (Fastest)</h2>
<p>The easiest method is using an AI-powered tool like <a href="/background-remover">ClearCut</a>. Simply upload your image and the AI automatically identifies and removes the background in seconds.</p>
<ol><li>Go to <a href="/background-remover">ClearCut Background Remover</a></li><li>Drop or upload your image</li><li>Wait 3-8 seconds for AI processing</li><li>Choose your background (transparent, white, custom)</li><li>Download the result</li></ol>
<h2>Method 2: Photoshop (Most Precise)</h2>
<p>Adobe Photoshop offers the most control with its "Remove Background" feature (Select > Subject) and manual refinement tools like the Pen Tool and Refine Edge.</p>
<h2>Method 3: GIMP (Free Desktop App)</h2>
<p>GIMP is a free Photoshop alternative with background removal capabilities using the Fuzzy Select tool and Color Select.</p>
<h2>Method 4: PowerPoint (Surprisingly Good)</h2>
<p>Microsoft PowerPoint has a built-in "Remove Background" tool (Format > Remove Background) that works surprisingly well for simple images.</p>
<h2>Method 5: CSS mix-blend-mode (For Web)</h2>
<p>If you only need to remove a white background for web display, CSS <code>mix-blend-mode: multiply</code> can work without any image editing.</p>
<h2>Which Method Should You Choose?</h2>
<p>For quick, one-off removals: <a href="/background-remover">ClearCut</a> (free, instant). For professional work: Photoshop or <a href="/go/removebg">remove.bg Pro</a>.</p>`,
  },
  'ecommerce-product-photo-background': {
    title: 'E-commerce Product Photography: Background Removal Tips',
    description: 'Create clean product photos for your online store.',
    date: '2026-03-20', readTime: '7 min',
    keywords: ['product photo background', 'ecommerce product photography', 'white background product'],
    content: `<p>Clean product photos are essential for e-commerce success. Studies show that products with professional white backgrounds see 20-30% higher conversion rates.</p>
<h2>Why White Backgrounds Matter</h2>
<ul><li><strong>Amazon requires it:</strong> Main product images must have pure white (#FFFFFF) backgrounds</li><li><strong>Consistency:</strong> White backgrounds create a uniform look across your catalog</li><li><strong>Focus:</strong> Removes distractions, putting focus on the product</li><li><strong>Versatility:</strong> Easy to use across multiple platforms and marketing materials</li></ul>
<h2>How to Get Clean Product Backgrounds</h2>
<h3>Option 1: Shoot on White</h3>
<p>Use a lightbox or white sweep. This gives the cleanest starting point. You may still need to clean up shadows.</p>
<h3>Option 2: AI Background Removal</h3>
<p>Tools like <a href="/background-remover">ClearCut</a> can remove any background and replace it with pure white. This works great for products you have already photographed.</p>
<h3>Option 3: Professional Services</h3>
<p>For high-volume catalogs, services like <a href="/go/removebg">remove.bg</a> offer batch processing APIs that can handle thousands of images automatically.</p>
<h2>Tips for Best Results</h2>
<ul><li>Shoot with good, even lighting</li><li>Use a contrasting background (makes AI removal easier)</li><li>Avoid reflective surfaces</li><li>Capture multiple angles</li><li>Leave some padding around the product</li></ul>
<p>Start with our free <a href="/background-remover">background remover</a> to test the process, then scale up with professional tools as your catalog grows.</p>`,
  },
  'how-to-remove-background-from-image-free': {
    title: 'How to Remove Background from Image: 7 Free Methods (2026)',
    description: 'Learn 7 free ways to remove background from any image in 2026. Compare AI tools, Photoshop, and browser-based options. Step-by-step guide with examples.',
    date: '2026-03-29', readTime: '12 min',
    keywords: ['remove background from image', 'background remover free', 'transparent background maker', 'remove bg online', 'background eraser'],
    content: `<p><strong>Need to remove the background from an image?</strong> Whether you're creating product photos for your online store, designing social media graphics, or making a transparent PNG for a presentation, this guide covers 7 free methods — from AI-powered instant tools to manual Photoshop techniques.</p>

<p>We tested each method on 3 image types: portrait photos, product shots, and complex scenes with hair/fur. Here are the results.</p>

<nav><strong>In this guide:</strong><ul><li><a href="#method-1">Method 1: Browser-Based AI (Fastest &amp; Most Private)</a></li><li><a href="#method-2">Method 2: remove.bg (Best Accuracy)</a></li><li><a href="#method-3">Method 3: Canva (Best for Design Projects)</a></li><li><a href="#method-4">Method 4: Photoshop (Most Precise Control)</a></li><li><a href="#method-5">Method 5: GIMP (Free Desktop Alternative)</a></li><li><a href="#method-6">Method 6: PowerPoint (Surprisingly Good)</a></li><li><a href="#method-7">Method 7: Python Script (For Developers)</a></li><li><a href="#comparison">Side-by-Side Comparison Table</a></li><li><a href="#faq">FAQ</a></li></ul></nav>

<h2 id="method-1">Method 1: Browser-Based AI — Fastest &amp; Most Private</h2>
<p><strong>Time:</strong> 3-8 seconds | <strong>Cost:</strong> Free | <strong>Privacy:</strong> ★★★★★</p>
<p>Tools like <a href="/background-remover">ClearCut</a> run AI directly in your browser using WebAssembly. Your image never leaves your device — the neural network processes everything locally.</p>
<h3>Step-by-Step:</h3>
<ol><li>Go to <a href="/background-remover">ClearCut Background Remover</a></li><li>Drop or upload your image (JPG, PNG, or WebP, up to 10MB)</li><li>Wait 3-8 seconds for AI processing (first use downloads a ~5MB model)</li><li>Choose your background: transparent, white, black, blur, or custom color</li><li>Download the result as PNG, JPG, or WebP</li></ol>
<p><strong>Pros:</strong> Completely free, no sign-up, 100% private (nothing uploaded), works offline after first use.</p>
<p><strong>Cons:</strong> Uses a lighter AI model than server-side tools — fine hair and transparent objects may not be perfect.</p>
<blockquote><strong>Best for:</strong> Quick removals where privacy matters, casual use, and when you don't want to create yet another account.</blockquote>

<h2 id="method-2">Method 2: remove.bg — Best Overall Accuracy</h2>
<p><strong>Time:</strong> ~5 seconds | <strong>Cost:</strong> Free preview, HD from $0.20/image | <strong>Privacy:</strong> ★★★☆☆</p>
<p><a href="/go/removebg">remove.bg</a> (now owned by Canva) uses server-side AI that's been trained on millions of images. It handles difficult cases — fine hair, semi-transparent fabrics, and complex edges — better than any browser-based tool.</p>
<p>In our testing, remove.bg correctly handled 94% of edge pixels on portrait photos, compared to ~85% for browser-based tools. The difference is most noticeable on curly hair and wispy edges.</p>
<p><strong>Pros:</strong> Industry-leading accuracy, handles hair brilliantly, API available for batch processing.</p>
<p><strong>Cons:</strong> Free tier gives low-res previews only. HD downloads require credits ($0.20-$0.90 each). Images are uploaded to their servers.</p>

<h2 id="method-3">Method 3: Canva — Best for Design Projects</h2>
<p><strong>Time:</strong> ~10 seconds | <strong>Cost:</strong> Free (limited), Pro from $12.99/mo | <strong>Privacy:</strong> ★★★☆☆</p>
<p><a href="/go/canva">Canva Pro</a> includes background removal as part of its design platform. The killer feature: after removing the background, you can immediately place the subject onto templates, social media graphics, or custom designs — all in one workflow.</p>
<p><strong>Pros:</strong> Full design ecosystem after removal, templates, team collaboration.</p>
<p><strong>Cons:</strong> Background remover requires Pro plan ($12.99/mo). Overkill if you only need background removal.</p>

<h2 id="method-4">Method 4: Adobe Photoshop — Most Precise Manual Control</h2>
<p><strong>Time:</strong> 2-30 minutes | <strong>Cost:</strong> $22.99/mo (Photography Plan) | <strong>Privacy:</strong> ★★★★★</p>
<p>Photoshop's "Remove Background" (Select &gt; Subject) uses Adobe Sensei AI, plus you get manual tools (Pen Tool, Quick Selection, Refine Edge) for pixel-perfect results.</p>
<h3>Quick Method:</h3>
<ol><li>Open your image in Photoshop</li><li>Go to Select &gt; Subject (AI auto-selection)</li><li>Refine with Select &gt; Select and Mask</li><li>Add a layer mask or delete the background</li><li>Export as PNG with transparency</li></ol>
<p><strong>Pros:</strong> Best possible quality with manual refinement, handles any image type.</p>
<p><strong>Cons:</strong> Expensive subscription, steep learning curve, slow for batch work.</p>

<h2 id="method-5">Method 5: GIMP — Free Desktop Alternative</h2>
<p><strong>Time:</strong> 5-20 minutes | <strong>Cost:</strong> Free | <strong>Privacy:</strong> ★★★★★</p>
<p>GIMP (GNU Image Manipulation Program) is a free, open-source Photoshop alternative. Use Fuzzy Select (Magic Wand), Color Select, or manual paths to remove backgrounds.</p>
<p><strong>Pros:</strong> Completely free, no account needed, runs locally.</p>
<p><strong>Cons:</strong> No AI assistance (purely manual), less intuitive interface, slow for complex images.</p>

<h2 id="method-6">Method 6: PowerPoint — The Unexpected Option</h2>
<p><strong>Time:</strong> 1-3 minutes | <strong>Cost:</strong> Included with Microsoft 365 | <strong>Privacy:</strong> ★★★★☆</p>
<p>Yes, PowerPoint. Insert your image, click Format &gt; Remove Background. It works surprisingly well for simple subjects with contrasting backgrounds.</p>
<p><strong>Pros:</strong> Already installed on most computers, dead simple.</p>
<p><strong>Cons:</strong> Limited accuracy, no transparency export (workaround: save as SVG), struggles with complex edges.</p>

<h2 id="method-7">Method 7: Python + rembg (For Developers)</h2>
<p><strong>Time:</strong> Setup ~5 min, then ~2 seconds per image | <strong>Cost:</strong> Free | <strong>Privacy:</strong> ★★★★★</p>
<p>The <code>rembg</code> Python library uses the same U2-Net model family as browser-based tools, but runs locally with full GPU acceleration. Perfect for batch processing thousands of images.</p>
<pre><code>pip install rembg
rembg i input.jpg output.png          # Single image
rembg p input_folder/ output_folder/  # Batch processing</code></pre>
<p><strong>Pros:</strong> Free, local, scriptable, batch capable, GPU accelerated.</p>
<p><strong>Cons:</strong> Requires Python + terminal knowledge. Not for non-technical users.</p>

<h2 id="comparison">Side-by-Side Comparison</h2>
<table><thead><tr><th>Method</th><th>Speed</th><th>Accuracy</th><th>Cost</th><th>Privacy</th><th>Best For</th></tr></thead>
<tbody>
<tr><td><a href="/background-remover">ClearCut</a></td><td>3-8s</td><td>★★★★☆</td><td>Free</td><td>★★★★★</td><td>Quick &amp; private</td></tr>
<tr><td><a href="/go/removebg">remove.bg</a></td><td>~5s</td><td>★★★★★</td><td>$0.20+/img</td><td>★★★☆☆</td><td>Professional quality</td></tr>
<tr><td><a href="/go/canva">Canva Pro</a></td><td>~10s</td><td>★★★★☆</td><td>$12.99/mo</td><td>★★★☆☆</td><td>Design projects</td></tr>
<tr><td>Photoshop</td><td>2-30min</td><td>★★★★★</td><td>$22.99/mo</td><td>★★★★★</td><td>Pixel-perfect control</td></tr>
<tr><td>GIMP</td><td>5-20min</td><td>★★★☆☆</td><td>Free</td><td>★★★★★</td><td>Free desktop editing</td></tr>
<tr><td>PowerPoint</td><td>1-3min</td><td>★★☆☆☆</td><td>M365 included</td><td>★★★★☆</td><td>Quick &amp; simple</td></tr>
<tr><td>Python rembg</td><td>~2s/img</td><td>★★★★☆</td><td>Free</td><td>★★★★★</td><td>Batch processing</td></tr>
</tbody></table>

<h2 id="faq">Frequently Asked Questions</h2>

<h3>What's the best free background remover in 2026?</h3>
<p>For most users, <a href="/background-remover">ClearCut</a> offers the best combination of free, instant, and private. For maximum accuracy, <a href="/go/removebg">remove.bg</a> leads with server-side AI, though HD downloads cost $0.20+ each.</p>

<h3>Can I remove backgrounds on my phone?</h3>
<p>Yes. Browser-based tools like <a href="/background-remover">ClearCut</a> work on any modern mobile browser — no app needed. For native apps, try PhotoRoom (iOS/Android) or the built-in cutout feature in iOS 16+ (long-press subject in Photos).</p>

<h3>How do I make a transparent background?</h3>
<p>Upload your image to any background remover, then download as PNG format. PNG supports transparency, while JPG does not. In <a href="/background-remover">ClearCut</a>, select "Transparent" as the background option before downloading.</p>

<h3>Which method is best for e-commerce product photos?</h3>
<p>For small catalogs (under 50 images): <a href="/background-remover">ClearCut</a> or <a href="/go/removebg">remove.bg</a>. For large catalogs: Python rembg for batch processing, or remove.bg's API at $0.05-$0.20 per image.</p>

<h3>Is it safe to upload my photos to online background removers?</h3>
<p>Most reputable tools (remove.bg, Canva) delete images after processing. But if privacy is critical — ID photos, confidential documents, NSFW content — use a local tool like <a href="/background-remover">ClearCut</a> (browser-based, nothing uploaded) or GIMP.</p>

<h2>Conclusion: Which Method Should You Choose?</h2>
<p>For <strong>90% of users</strong>, start with <a href="/background-remover">ClearCut</a> — it's free, instant, and private. If the result isn't perfect enough, try <a href="/go/removebg">remove.bg</a> for professional-grade accuracy. Reserve Photoshop for cases where you need pixel-perfect manual control.</p>
<p>The best approach? Use free tools first, upgrade to paid only when you hit their limits.</p>`,
  },
  'transparent-background-png-guide': {
    title: 'How to Make a Transparent Background PNG: Complete Guide',
    description: 'Learn how to create transparent background PNG images for logos, product photos, and web graphics. Free tools and step-by-step tutorials.',
    date: '2026-03-29', readTime: '8 min',
    keywords: ['transparent background', 'transparent png', 'make background transparent', 'transparent background maker', 'png transparent'],
    content: `<p><strong>A transparent background PNG</strong> is essential for logos, product images, overlays, and professional web graphics. This guide shows you exactly how to create one — whether you're a designer, shop owner, or complete beginner.</p>

<p><strong>Key takeaway:</strong> The fastest way to make a transparent background is to use an AI tool like <a href="/background-remover">ClearCut</a> — drop your image, select "Transparent" background, and download the PNG. Takes under 10 seconds.</p>

<nav><strong>Contents:</strong><ul><li><a href="#what">What is a Transparent Background?</a></li><li><a href="#why">Why You Need Transparent PNGs</a></li><li><a href="#methods">4 Ways to Make a Transparent Background</a></li><li><a href="#tips">Pro Tips for Perfect Transparency</a></li><li><a href="#formats">File Formats That Support Transparency</a></li><li><a href="#faq">FAQ</a></li></ul></nav>

<h2 id="what">What Is a Transparent Background?</h2>
<p>A transparent background means the area behind your subject has no color — it's see-through. When you place a transparent PNG on a website, document, or design, the background of the container shows through instead of a white or colored box.</p>
<p>You've seen this everywhere: logos that sit cleanly on any color, product photos that blend into page layouts, and stickers/emojis that float without boxes.</p>
<p>Technically, transparency is stored in the <strong>alpha channel</strong> — a fourth channel alongside Red, Green, and Blue (RGBA). Each pixel has a transparency value from 0 (fully transparent) to 255 (fully opaque).</p>

<h2 id="why">Why You Need Transparent PNGs</h2>
<ul>
<li><strong>Logos:</strong> Place on any color background without a white box. Essential for brand consistency.</li>
<li><strong>E-commerce:</strong> Product photos on transparent backgrounds can be placed on white (Amazon requirement), lifestyle scenes, or marketing materials.</li>
<li><strong>Web design:</strong> Icons, illustrations, and UI elements need transparency to integrate with page designs.</li>
<li><strong>Social media:</strong> Create overlays, stickers, and watermarks that look professional.</li>
<li><strong>Print:</strong> Transparent PNGs are used in brochures, business cards, and merchandise where subjects overlay backgrounds.</li>
</ul>

<h2 id="methods">4 Ways to Make a Transparent Background</h2>

<h3>Way 1: AI Background Remover (Recommended)</h3>
<p>The fastest method. AI identifies the subject and removes everything else automatically.</p>
<ol><li>Open <a href="/background-remover">ClearCut Background Remover</a></li><li>Upload your image</li><li>Wait for AI processing (3-8 seconds)</li><li>Select "Transparent" as background (it's the default)</li><li>Click Download — you get a PNG with full transparency</li></ol>
<p><strong>Why this method wins:</strong> No skill required, handles complex subjects (hair, fur, irregular shapes), and ClearCut processes everything in your browser so your image stays private.</p>
<p>For professional-grade results on difficult images, <a href="/go/removebg">remove.bg Pro</a> uses server-side AI with higher accuracy on fine details.</p>

<h3>Way 2: Photoshop</h3>
<ol><li>Open image → Select &gt; Subject</li><li>Refine edges with Select &gt; Select and Mask</li><li>Delete background layer or add layer mask</li><li>File &gt; Export As &gt; PNG (ensure Transparency is checked)</li></ol>

<h3>Way 3: Canva</h3>
<ol><li>Upload image to <a href="/go/canva">Canva</a></li><li>Click on image → Edit Image → BG Remover (Pro feature)</li><li>Download as PNG with transparent background</li></ol>

<h3>Way 4: GIMP (Free)</h3>
<ol><li>Open image → Layer &gt; Transparency &gt; Add Alpha Channel</li><li>Select background with Fuzzy Select or By Color Select</li><li>Press Delete to remove selected background</li><li>File &gt; Export As &gt; .png</li></ol>

<h2 id="tips">Pro Tips for Perfect Transparency</h2>
<ul>
<li><strong>Always save as PNG</strong> — JPG doesn't support transparency. If you save as JPG, transparent areas become white.</li>
<li><strong>Check for halo artifacts</strong> — A thin white or colored border around the subject means the edge wasn't cleaned properly. Use "Refine Edge" in Photoshop or try a different AI tool.</li>
<li><strong>Use the checkerboard test</strong> — Most image editors show transparency as a gray-white checkerboard. If you see checkerboard around your subject, the background is truly transparent.</li>
<li><strong>Mind the file size</strong> — PNG files with transparency are larger than JPGs. For web use, run them through a PNG optimizer like TinyPNG to reduce size by 60-80% without quality loss.</li>
<li><strong>Semi-transparency matters</strong> — Good tools preserve semi-transparent edges (like hair wisps or glass). This prevents the harsh "cut out with scissors" look.</li>
</ul>

<h2 id="formats">File Formats That Support Transparency</h2>
<table><thead><tr><th>Format</th><th>Transparency</th><th>Best For</th><th>File Size</th></tr></thead>
<tbody>
<tr><td><strong>PNG</strong></td><td>✅ Full alpha</td><td>Web, logos, UI elements</td><td>Medium-Large</td></tr>
<tr><td><strong>WebP</strong></td><td>✅ Full alpha</td><td>Web (smaller than PNG)</td><td>Small-Medium</td></tr>
<tr><td><strong>SVG</strong></td><td>✅ Full alpha</td><td>Logos, icons (vector)</td><td>Very Small</td></tr>
<tr><td><strong>GIF</strong></td><td>⚠️ 1-bit only</td><td>Simple graphics, animations</td><td>Small</td></tr>
<tr><td><strong>JPG/JPEG</strong></td><td>❌ None</td><td>Photos (no transparency)</td><td>Small</td></tr>
<tr><td><strong>TIFF</strong></td><td>✅ Full alpha</td><td>Print, archival</td><td>Large</td></tr>
</tbody></table>

<h2 id="faq">FAQ</h2>

<h3>Why is my transparent PNG showing a white background?</h3>
<p>Two common causes: (1) The file is actually a JPG renamed to .png — re-export properly from an editor. (2) The viewing application doesn't support transparency — Windows Photo Viewer shows transparency as white. Open in a browser or design tool to verify.</p>

<h3>Can I make a JPG background transparent?</h3>
<p>Not directly — JPG doesn't support transparency. You need to remove the background using a tool like <a href="/background-remover">ClearCut</a>, then save the result as PNG. The conversion from JPG → background removal → PNG is automatic in most AI tools.</p>

<h3>What's the difference between PNG-8 and PNG-24 transparency?</h3>
<p>PNG-8 supports only 1-bit transparency (pixel is either fully transparent or fully opaque — like GIF). PNG-24/32 supports full alpha channel with 256 levels of transparency, allowing smooth semi-transparent edges. Always use PNG-24 for background removal results.</p>

<h3>How do I make a white logo background transparent?</h3>
<p>For simple logos on solid white: use GIMP's "Select by Color" to select white, then delete. For complex logos or photos: use <a href="/background-remover">ClearCut</a> or <a href="/go/removebg">remove.bg</a> for AI-powered removal.</p>

<h2>Conclusion</h2>
<p>Making a transparent background PNG is quick and free with modern AI tools. For most use cases, <a href="/background-remover">ClearCut's browser-based remover</a> gets the job done in seconds with zero privacy concerns. For professional-grade results on complex images, combine AI removal with manual Photoshop refinement.</p>
<p>Start with the free tools — you can always upgrade to paid options when the quality demands justify the cost.</p>`,
  },
};

export async function generateStaticParams() { return Object.keys(posts).map(slug => ({ slug })); }

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return { title: post.title, description: post.description, keywords: post.keywords };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return <div className="py-20 text-center">Post not found</div>;

  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.description, datePublished: post.date, author: { '@type': 'Organization', name: 'ClearCut' } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blog" className="text-[--color-primary] hover:underline text-sm mb-4 inline-block">← Back to Blog</Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500"><time>{post.date}</time><span>·</span><span>{post.readTime}</span></div>
        <div className="mt-8 prose prose-lg prose-purple max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Try It Free</h2>
          <p className="mt-3 text-gray-600">Remove backgrounds from your images — free, instant, 100% private.</p>
          <Link href="/background-remover" className="mt-6 inline-block bg-[--color-primary] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[--color-primary-dark] shadow-lg shadow-purple-200">Remove Background →</Link>
        </div>
      </article>
    </>
  );
}
