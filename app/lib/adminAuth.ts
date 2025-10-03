import crypto from 'crypto';

function base64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input));
  return buf.toString('base64').replace(/=+$/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export function signToken(payload: Record<string, any>, secret: string, expiresInSec = 60 * 60 * 24) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSec };
  const data = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(body))}`;
  const sig = crypto.createHmac('sha256', secret).update(data).digest();
  return `${data}.${base64url(sig)}`;
}

export function verifyToken(token: string, secret: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [h, p, s] = parts;
    const data = `${h}.${p}`;
    const expectedSig = crypto.createHmac('sha256', secret).update(data).digest();
    const sigBuf = Buffer.from(padBase64Url(s), 'base64');
    // timing-safe comparison
    if (sigBuf.length !== expectedSig.length) return null;
    if (!crypto.timingSafeEqual(sigBuf, expectedSig)) return null;
    const payload = JSON.parse(Buffer.from(padBase64Url(p), 'base64').toString('utf-8'));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

function padBase64Url(s: string) {
  const rem = s.length % 4;
  if (rem === 2) return s + '==';
  if (rem === 3) return s + '=';
  if (rem === 0) return s;
  // rem === 1 is invalid
  return s + '===';
}
