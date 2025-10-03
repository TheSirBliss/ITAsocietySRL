// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { ContactFormEmail } from '../src/emails/ContactFormEmail';

// Inizializza Resend con la chiave API dalle variabili d'ambiente di Vercel
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Accetta solo richieste POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { name, email, message } = req.body;

  // Semplice validazione per assicurarsi che i campi non siano vuoti
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'ITAsociety Website <noreply@itasocietysrl.com>', // DEVE essere un indirizzo del tuo dominio verificato su Resend
      to: ['info@itasocietysrl.com'], // L'email dove ricevi i messaggi
      subject: `New Message from ${name}`,
      reply_to: email,
      react: ContactFormEmail({ name, email, message }), // Usa il componente React come template!
    });

    if (error) {
      console.error({ error });
      return res.status(500).json({ message: 'Failed to send message' });
    }

    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An internal error occurred' });
  }
}
