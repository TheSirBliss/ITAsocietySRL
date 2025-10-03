import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { verifyToken } from '../../../lib/adminAuth';

// Run in Node runtime so we can access filesystem
export const runtime = 'nodejs';

function getTokenFromReq(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(/(?:^|; )admin_token=([^;]+)/);
  if (!match) return null;
  return decodeURIComponent(match[1]);
}

export async function GET(req: Request) {
  try {
    const token = getTokenFromReq(req);
    const tokenSecret = process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD || '';
    if (!token || !verifyToken(token, tokenSecret)) return new NextResponse('Unauthorized', { status: 401 });

    const file = path.join(process.cwd(), 'tmp', 'subscribe.log');
    if (!fs.existsSync(file)) return NextResponse.json([]);
    const raw = fs.readFileSync(file, { encoding: 'utf-8' }).trim();
    if (!raw) return NextResponse.json([]);
    const lines = raw.split('\n').filter(Boolean);
    const items = lines.map((l) => {
      try {
        return JSON.parse(l);
      } catch (e) {
        return { raw: l };
      }
    });
    return NextResponse.json(items);
  } catch (err) {
    console.error('Failed to read subscriptions log', err);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}
