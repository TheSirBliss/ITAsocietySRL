import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Ensure this route uses the Node runtime (required for nodemailer in Next.js edge environments)
export const runtime = 'nodejs';

export async function POST(request: Request) {
  

  function createTransporter() {
      const user = process.env.EMAIL_USER;
      const pass = process.env.EMAIL_PASS;
      const host = process.env.EMAIL_HOST;
      const port = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined;
      const secure = process.env.EMAIL_SECURE === 'true';
      const requireTLS = process.env.EMAIL_REQUIRE_TLS === 'true';
      const tlsReject = process.env.EMAIL_TLS_REJECT_UNAUTHORIZED !== 'false';

      if (user && pass) {
        // If host/port provided, prefer explicit transport options (e.g., Aruba)
        if (host && port) {
          const opts: any = { host, port, secure, auth: { user, pass } };
          if (requireTLS) opts.requireTLS = true;
          // allow opting out of strict TLS verification for some providers
          opts.tls = { rejectUnauthorized: tlsReject };
          return nodemailer.createTransport(opts);
        }
        // Fallback to well-known service (Gmail) when only creds provided
        return nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
      }
      return null;
  }

  const body = await request.json().catch(() => null);
  if (!body || !body.email) {
    return NextResponse.json({ success: false, error: 'Missing email in body' }, { status: 400 });
  }

  const transporter = createTransporter();
  if (!transporter) {
    // In development fallback: write subscription to a log file instead of failing
    try {
      const fs = await import('fs');
      const path = (await import('path')).join(process.cwd(), 'tmp');
      if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
      const entry = { id: Date.now(), email: body.email, createdAt: new Date().toISOString() };
      fs.appendFileSync((await import('path')).join(process.cwd(), 'tmp', 'subscribe.log'), JSON.stringify(entry) + '\n');
      return NextResponse.json({ success: true, note: 'Stored to tmp/subscribe.log (SMTP not configured)' });
    } catch (err) {
      return NextResponse.json({ success: false, error: 'SMTP not configured and fallback logging failed' }, { status: 500 });
    }
  }

  try {
    const to = process.env.EMAIL_TO || 'info@itasociety.com';
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'New subscription',
      text: `Email: ${body.email}`,
    });
    console.log('Subscribe email sent:', info?.messageId || info);
    return NextResponse.json({ success: true, info });
  } catch (error: any) {
    console.error('Subscribe email send failed:', error?.message || error);
    return NextResponse.json({ success: false, error: String(error?.message || error) }, { status: 500 });
  }
}