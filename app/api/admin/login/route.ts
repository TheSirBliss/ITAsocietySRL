import { NextResponse } from 'next/server';
import { signToken } from '../../../lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password } = body || {};
    const secret = process.env.ADMIN_PASSWORD || '';
    if (!secret || password !== secret) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const tokenSecret = process.env.ADMIN_TOKEN_SECRET || secret;
    const token = signToken({ sub: 'admin' }, tokenSecret, 60 * 60 * 24);

  const res = NextResponse.json({ ok: true });
  // set signed token cookie; HttpOnly. Add Secure when in production
  const isProd = process.env.NODE_ENV === 'production';
  const secureFlag = isProd ? '; Secure' : '';
  res.headers.set('Set-Cookie', `admin_token=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; SameSite=Strict${secureFlag}`);
    return res;
  } catch (e) {
    return new NextResponse('Bad Request', { status: 400 });
  }
}
