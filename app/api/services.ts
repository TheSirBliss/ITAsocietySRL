// api/services.ts
import { NowRequest, NowResponse } from '@vercel/node';
import SERVICES from '../../src/data/services-content.json';

export default function handler(req: NowRequest, res: NowResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ ok: true, data: SERVICES });
}