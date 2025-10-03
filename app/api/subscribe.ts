// api/subscribe.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { email } = req.body;

  try {
    await resend.emails.send({
      from: 'Newsletter <noreply@itasocietysrl.com>',
      to: ['info@itasocietysrl.com'],
      subject: 'New Newsletter Subscriber! 🎉',
      html: `<p>New subscriber joined your mailing list: <strong>${email}</strong></p>`,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}
