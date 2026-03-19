import { NextResponse } from 'next/server';
import { buildLeadEmail } from '@/lib/email';
import type { AnalysisResult } from '@/lib/mirror-analysis';

type LeadPayload = {
  firstName?: string;
  email?: string;
  situation?: string;
  analysisResult?: AnalysisResult;
};

const isAnalysisResult = (value: unknown): value is AnalysisResult => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return ['summary', 'fear', 'intuition', 'nextStep'].every(
    (key) => typeof candidate[key] === 'string' && String(candidate[key]).trim().length > 0
  );
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;
    const firstName = body.firstName?.trim() ?? '';
    const email = body.email?.trim() ?? '';
    const situation = body.situation?.trim() ?? '';
    const analysisResult = body.analysisResult;

    if (firstName.length < 2 || !/\S+@\S+\.\S+/.test(email) || situation.length < 40 || !isAnalysisResult(analysisResult)) {
      return NextResponse.json(
        {
          error: 'Données incomplètes pour préparer votre éclairage.'
        },
        { status: 400 }
      );
    }

    const html = buildLeadEmail({
      firstName,
      situation,
      analysis: analysisResult
    });

    // Future provider integration point (Resend, SMTP, SendGrid, etc.)
    // The HTML body is ready to be sent directly by an email service.
    return NextResponse.json(
      {
        success: true,
        preview: {
          to: email,
          subject: 'Votre éclairage complet — Miroir d’Intuition',
          html
        }
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        error: 'Impossible de préparer l’envoi de l’e-mail pour le moment.'
      },
      { status: 500 }
    );
  }
}
