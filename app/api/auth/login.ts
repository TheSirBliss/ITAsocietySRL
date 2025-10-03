// api/auth/login.ts
import { NowRequest, NowResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

export default async function (req: NowRequest, res: NowResponse) {
  const { email, password } = req.body || {};
  // TODO -> valida contro DB; per ora stub
  if (email === 'partner@itasociety.ai' && password === 'changeme') {
    const token = jwt.sign({ email, role: 'partner' }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).json({ ok: true, token });
  }
  return res.status(401).json({ ok: false, message: 'Invalid credentials' });
}