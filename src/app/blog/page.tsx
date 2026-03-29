import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Background Removal Guides & Tips',
  description: 'Learn about AI background removal. Guides, tool comparisons, and tips for photographers, designers, and e-commerce.',
};

const posts = [
  { slug: 'how-to-remove-background-from-image-free', title: 'How to Remove Background from Image: 7 Free Methods (2026)', description: 'Learn 7 free ways to remove background from any image in 2026. Compare AI tools, Photoshop, and browser-based options.', date: '2026-03-29', readTime: '12 min' },
  { slug: 'transparent-background-png-guide', title: 'How to Make a Transparent Background PNG: Complete Guide', description: 'Learn how to create transparent background PNG images for logos, product photos, and web graphics.', date: '2026-03-29', readTime: '8 min' },
  { slug: 'best-background-remover-tools-2026', title: 'Best Background Remover Tools in 2026: Free vs Paid', description: 'We compared the top background removal tools. See which ones deliver the best results.', date: '2026-03-28', readTime: '10 min' },
  { slug: 'how-to-remove-background-from-image', title: 'How to Remove Background from Image: 5 Free Methods', description: 'Step-by-step guide to removing backgrounds using free tools, Photoshop, and AI.', date: '2026-03-24', readTime: '8 min' },
  { slug: 'ecommerce-product-photo-background', title: 'E-commerce Product Photography: Background Removal Tips', description: 'How to create clean product photos for your online store with professional backgrounds.', date: '2026-03-20', readTime: '7 min' },
  { slug: 'remove-background-from-product-photos', title: 'How to Remove Background from Product Photos (Free Methods)', description: 'Clean product photo backgrounds for Amazon, Shopify, and eBay.', date: '2026-03-22', readTime: '8 min' },
  { slug: 'remove-bg-alternative-free', title: 'Best remove.bg Alternatives in 2026 (Free & Open Source)', description: 'Free alternatives to remove.bg for background removal.', date: '2026-03-20', readTime: '8 min' },
  { slug: 'background-removal-api-guide', title: 'Background Removal API: Best Options for Developers (2026)', description: 'Compare background removal APIs for your app.', date: '2026-03-17', readTime: '9 min' },
  { slug: 'passport-photo-background-white', title: 'How to Make a Passport Photo Background White (Free)', description: 'Remove passport photo background for US, UK, EU, and more.', date: '2026-03-14', readTime: '6 min' },
  { slug: 'bulk-background-removal-free', title: 'Bulk Background Removal: Process Hundreds of Images Free', description: 'How to remove backgrounds from multiple images at once.', date: '2026-03-11', readTime: '7 min' },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Blog</h1>
        <p className="mt-4 text-lg text-gray-600">Background removal guides, comparisons, and tips.</p>
      </div>
      <div className="space-y-6">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2"><time>{post.date}</time><span>·</span><span>{post.readTime}</span></div>
            <h2 className="text-xl font-bold text-gray-900 hover:text-[--color-primary]">{post.title}</h2>
            <p className="mt-2 text-gray-600">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
