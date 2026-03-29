import { NextResponse } from 'next/server';
import { getUsage } from '@/lib/api/auth';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const apiKey = authHeader?.replace('Bearer ', '') || request.headers.get('x-api-key') || '';

  if (!apiKey) {
    return NextResponse.json({ error: 'API key required' }, { status: 401 });
  }

  const usage = getUsage(apiKey);
  if (!usage) {
    return NextResponse.json({ error: 'API key not found' }, { status: 404 });
  }

  return NextResponse.json({
    plan: usage.plan,
    used: usage.used,
    limit: usage.limit,
    remaining: usage.limit - usage.used,
  });
}
