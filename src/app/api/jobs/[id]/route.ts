import { NextResponse } from 'next/server';
import { getJobDetails } from '@/lib/api/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await getJobDetails(Number(params.id));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch job details' }, { status: 500 });
  }
} 