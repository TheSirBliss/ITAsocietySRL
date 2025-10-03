import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { verifyToken } from '../../../lib/adminAuth';

export const runtime = 'nodejs';

function getTokenFromReq(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(/(?:^|; )admin_token=([^;]+)/);
  if (!match) return null;
  return decodeURIComponent(match[1]);
}

export async function POST(req: Request) {
  try {
    const token = getTokenFromReq(req);
    const tokenSecret = process.env.ADMIN_TOKEN_SECRET || process.env.ADMIN_PASSWORD || '';
    if (!token || !verifyToken(token, tokenSecret)) return new NextResponse('Unauthorized', { status: 401 });

    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const host = process.env.EMAIL_HOST;
    const port = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined;
    const secure = process.env.EMAIL_SECURE === 'true';
    const requireTLS = process.env.EMAIL_REQUIRE_TLS === 'true';
    const tlsReject = process.env.EMAIL_TLS_REJECT_UNAUTHORIZED !== 'false';

    if (!user || !pass) return NextResponse.json({ error: 'SMTP not configured (missing EMAIL_USER or EMAIL_PASS)' }, { status: 400 });

    const opts: any = { host, port, secure, auth: { user, pass } };
    if (requireTLS) opts.requireTLS = true;
    opts.tls = { rejectUnauthorized: tlsReject };

    const transporter = nodemailer.createTransport(opts);

    const to = process.env.EMAIL_TO || user;
    const info = await transporter.sendMail({ from: user, to, subject: 'SMTP Test', text: 'This is a test from local Next API.' });
    console.log('SMTP test sent:', info?.messageId || info);
    return NextResponse.json({ ok: true, info });
  } catch (err) {
    console.error('SMTP test failed', err);
    return NextResponse.json({ error: 'failed', details: String(err) }, { status: 500 });
  }
}
