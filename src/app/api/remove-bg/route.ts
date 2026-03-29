import { NextResponse } from 'next/server';
import { removeBackgroundServer } from '@/lib/api/inference';
import { validateApiKey, recordUsage } from '@/lib/api/auth';

export const maxDuration = 30; // Vercel function timeout

export async function POST(request: Request) {
  // Auth
  const authHeader = request.headers.get('authorization');
  const apiKey = authHeader?.replace('Bearer ', '') || request.headers.get('x-api-key') || '';

  const auth = validateApiKey(apiKey);
  if (!auth.valid) {
    return NextResponse.json(
      { error: auth.error, docs: 'https://clearcut.tools/docs' },
      { status: 401 }
    );
  }

  try {
    let imageBuffer: Buffer;

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      // Form upload
      const formData = await request.formData();
      const file = formData.get('image') as File;
      if (!file) {
        return NextResponse.json({ error: 'No image file provided. Send as form field "image".' }, { status: 400 });
      }
      imageBuffer = Buffer.from(await file.arrayBuffer());
    } else if (contentType.includes('application/json')) {
      // JSON with URL
      const body = await request.json();
      if (!body.image_url) {
        return NextResponse.json({ error: 'Provide image_url in JSON body or upload as multipart form.' }, { status: 400 });
      }
      const imgRes = await fetch(body.image_url);
      if (!imgRes.ok) {
        return NextResponse.json({ error: `Failed to fetch image: ${imgRes.status}` }, { status: 400 });
      }
      imageBuffer = Buffer.from(await imgRes.arrayBuffer());
    } else {
      // Raw binary
      const body = await request.arrayBuffer();
      if (body.byteLength === 0) {
        return NextResponse.json({ error: 'Empty request body. Send image as binary, form upload, or JSON with image_url.' }, { status: 400 });
      }
      imageBuffer = Buffer.from(body);
    }

    // Validate size
    if (imageBuffer.length > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image too large. Max 10MB.' }, { status: 400 });
    }

    // Process
    const startTime = Date.now();
    const result = await removeBackgroundServer(imageBuffer);
    const processingTime = Date.now() - startTime;

    // Record usage
    recordUsage(apiKey);

    // Return PNG
    return new Response(new Uint8Array(result), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': result.length.toString(),
        'X-Processing-Time-Ms': processingTime.toString(),
        'X-Remaining-Credits': (auth.remaining! - 1).toString(),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Processing failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
