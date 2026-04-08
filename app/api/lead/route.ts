import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { buildLeadEmail } from '@/lib/email';
import type { AnalysisResult } from '@/lib/mirror-analysis';

type LeadPayload = {
  firstName?: string;
  email?: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  birthHour?: string;
  birthMinute?: string;
  birthCity?: string;
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
    const birthDay = body.birthDay?.trim() ?? '';
    const birthMonth = body.birthMonth?.trim() ?? '';
    const birthYear = body.birthYear?.trim() ?? '';
    const birthHour = body.birthHour?.trim() ?? '';
    const birthMinute = body.birthMinute?.trim() ?? '';
    const birthCity = body.birthCity?.trim() ?? '';
    const situation = body.situation?.trim() ?? '';
    const analysisResult = body.analysisResult;

    if (
      firstName.length < 2 ||
      !/\S+@\S+\.\S+/.test(email) ||
      birthDay.length < 1 ||
      birthMonth.length < 1 ||
      birthYear.length !== 4 ||
      birthCity.length < 2 ||
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

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.LEAD_EMAIL
    ) {
      console.error('Missing SMTP environment variables');

      return NextResponse.json(
        {
          error: 'Configuration e-mail incomplète côté serveur.'
        },
        { status: 500 }
      );
    }

    const html = buildLeadEmail({
      firstName,
      email,
      birthDay,
      birthMonth,
      birthYear,
      birthHour,
      birthMinute,
      birthCity,
      situation,
      analysis: analysisResult
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Miroir d’Intuition" <${process.env.SMTP_USER}>`,
      to: process.env.LEAD_EMAIL,
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
