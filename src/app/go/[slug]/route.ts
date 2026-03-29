import { NextResponse } from 'next/server';
import affiliates from '@/data/affiliates.json';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = affiliates.find(a => a.slug === slug);
  if (!product) return NextResponse.redirect(new URL('/', _request.url));
  return NextResponse.redirect(product.url, { status: 302 });
}
