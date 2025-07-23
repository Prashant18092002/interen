// app/api/incidents/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resolved = searchParams.get('resolved');

  try {
    const incidents = await prisma.incident.findMany({
      where: resolved ? { resolved: resolved === 'true' } : {},
      include: {
        camera: {
          select: {
            name: true,
            location: true,
          },
        },
      },
      orderBy: {
        tsStart: 'desc', // Newest first
      },
    });

    return NextResponse.json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return NextResponse.json({ error: 'Failed to fetch incidents' }, { status: 500 });
  }
}