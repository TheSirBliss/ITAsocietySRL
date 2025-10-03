import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // clear cookie by setting past expiry
  res.headers.set('Set-Cookie', `admin_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`);
  return res;
}
