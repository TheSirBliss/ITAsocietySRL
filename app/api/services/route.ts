import { NextResponse } from 'next/server';
import SERVICES from '../../../src/data/services-content.json';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({ ok: true, data: SERVICES });
}
