import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'ClearCut — Free AI Background Remover | 100% In-Browser', template: '%s | ClearCut' },
  description: 'Remove backgrounds from images for free using AI. No upload, no sign-up — all processing happens in your browser. 100% private.',
  keywords: ['background remover', 'remove background', 'remove bg', 'background eraser', 'transparent background', 'background remover free'],
  openGraph: { title: 'ClearCut — Free AI Background Remover', description: 'Remove backgrounds from images instantly. 100% private, processed in your browser.', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <GoogleAnalytics />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
