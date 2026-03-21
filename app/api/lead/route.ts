import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
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

    if (
      firstName.length < 2 ||
      !/\S+@\S+\.\S+/.test(email) ||
      situation.length < 40 ||
      !isAnalysisResult(analysisResult)
    ) {
      return NextResponse.json(
        {
          error: 'Données incomplètes pour préparer votre éclairage.'
        },
        { status: 400 }
      );
    }

    const html = buildLeadEmail({
      firstName,
      email,
      situation,
      analysis: analysisResult
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Miroir d’Intuition" <${process.env.EMAIL_USER}>`,
      to: 'arnaud.crestey14@gmail.com',
      replyTo: email,
      subject: `Nouveau lead - Miroir d’Intuition - ${firstName}`,
      html
    });

    return NextResponse.json(
      {
        success: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lead email error:', error);

    return NextResponse.json(
      {
        error: 'Impossible d’envoyer l’e-mail pour le moment.'
      },
      { status: 500 }
    );
  }
}
