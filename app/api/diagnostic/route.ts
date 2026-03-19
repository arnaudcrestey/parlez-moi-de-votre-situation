import { NextResponse } from 'next/server';
import { generateAnalysis } from '@/lib/mirror-analysis';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { situation?: string };
    const situation = body.situation?.trim() ?? '';

    if (situation.length < 40) {
      return NextResponse.json(
        {
          error: 'Situation trop courte. Merci de partager au moins 40 caractères.'
        },
        { status: 400 }
      );
    }

    const analysis = await generateAnalysis(situation);

    return NextResponse.json(analysis, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: 'Impossible de générer l’analyse pour le moment.'
      },
      { status: 500 }
    );
  }
}
