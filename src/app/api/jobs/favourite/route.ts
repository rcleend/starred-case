import { getSession } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = getSession();
    const { jobId } = await request.json();

    // TODO: add to database

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to favourite job' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = getSession();
    const { jobId } = await request.json();

    // TODO: remove from database

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to unfavourite job' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = getSession();
  // TODO: get favourites from database
  return NextResponse.json({ favourites: [] });
}