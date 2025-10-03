// api/contact.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { name, email, message } = req.body;

  // 1. Configura il transporter di Nodemailer con le tue credenziali SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.smtp.itasocietysrl.com,       // Es: smtp.tuoprovider.com
    port: parseInt(process.env.SMTP_PORT || '465'), // Es: 465 (con SSL) o 587 (con TLS)
    secure: process.env.SMTP_PORT === '465', // true per la porta 465, false per le altre
    auth: {
      user: process.env.info@itasocietysrl.com,     // La tua email: 
      pass: process.env.AR1Pant0$Rancito0@TuttixTitta,     // La password della tua email
    },
  });

  const mailOptions = {
    from: `"ITAsociety Website" <${process.env.SMTP_USER}>`, // Mittente
    to: process.env.SMTP_USER, // Destinatario (la tua email)
    replyTo: email, // Permette di rispondere direttamente all'utente
    subject: `New Contact Form Message from ${name}`,
    text: `You have received a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<h3>New Contact Form Submission</h3>
           <ul>
             <li><strong>Name:</strong> ${name}</li>
             <li><strong>Email:</strong> ${email}</li>
           </ul>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    return res.status(500).json({ success: false, message: 'Failed to send message' });
  }
}
