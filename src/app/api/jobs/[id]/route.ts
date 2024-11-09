import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${params.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch job details');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch job details' }, { status: 500 });
  }
} 