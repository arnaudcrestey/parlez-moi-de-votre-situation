'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AnalysisResult } from '@/lib/mirror-analysis';

const steps = [
  'Lecture de votre situation…',
  'Repérage des tensions intérieures…',
  'Mise en lumière d’un premier axe de clarté…'
];

export default function AnalysePage() {
  const router = useRouter();

  const [situation, setSituation] = useState('');
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedSituation = window.localStorage.getItem('miroir-intuition:situation');

    if (savedSituation) {
      setSituation(savedSituation);
    }

    setIsReady(true);
  }, []);

  const characterCount = useMemo(() => situation.trim().length, [situation]);

  useEffect(() => {
    if (!loading) return;

    const interval = window.setInterval(() => {
      setCurrentStep((value) => {
        if (value >= steps.length - 1) return value;
        return value + 1;
      });
    }, 1200);

    return () => window.clearInterval(interval);
  }, [loading]);

  const handleStartAnalysis = useCallback(async () => {
    const trimmed = situation.trim();

    if (trimmed.length < 40) {
      setError('Ajoutez quelques lignes pour obtenir un éclairage plus juste.');
      return;
    }

    setError('');
    setLoading(true);
    setCurrentStep(0);
    window.localStorage.setItem('miroir-intuition:situation', trimmed);

    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ situation: trimmed })
      });

      if (!response.ok) {
        throw new Error('diagnostic_failed');
      }

      const analysis = (await response.json()) as AnalysisResult;
      window.localStorage.setItem('miroir-intuition:analysis', JSON.stringify(analysis));

      window.setTimeout(() => {
        router.push('/resultat');
      }, 3600);
    } catch {
      setLoading(false);
      setError('Une difficulté temporaire empêche l’analyse pour le moment. Merci de réessayer dans un instant.');
    }
  }, [router, situation]);

  if (!isReady) {
    return null;
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <section className="mx-auto w-full max-w-3xl mirror-shell p-5 sm:p-8 lg:p-10">
          <p className="text-[10px] uppercase tracking-[0.16em] text-mirror-copper sm:text-xs sm:tracking-[0.18em]">
            Analyse en cours
          </p>

          <h1 className="mt-3 text-[2rem] font-semibold leading-tight text-mirror-ink sm:text-4xl lg:mt-4 lg:text-5xl">
            Nous préparons ce que votre situation révèle.
          </h1>

          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-mirror-muted sm:mt-4 sm:text-base">
            Prenez une respiration. L’analyse se structure doucement à partir de ce que vous avez confié.
          </p>

          <div className="mt-7 space-y-4 sm:mt-8 sm:space-y-5">
            <div className="h-2 overflow-hidden rounded-full bg-[rgba(220,199,174,0.42)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#b86f4d,#8e4b32)] transition-all duration-700"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="grid gap-3">
              {steps.map((step, index) => {
                const active = index <= currentStep;

                return (
                  <div
                    key={step}
                    className={`flex items-center gap-3 rounded-[18px] border px-4 py-3.5 transition-all duration-500 sm:gap-4 sm:rounded-[20px] sm:py-4 ${
                      active
                        ? 'border-[rgba(184,111,77,0.18)] bg-[rgba(255,250,244,0.92)]'
                        : 'border-transparent bg-[rgba(255,248,240,0.42)]'
                    }`}
                  >
                    <div
                      className={`h-3 w-3 rounded-full transition-all duration-500 ${
                        active
                          ? 'bg-mirror-copper shadow-[0_0_0_6px_rgba(184,111,77,0.12)]'
                          : 'bg-mirror-sand'
                      }`}
                    />
                    <p className={`text-sm sm:text-base ${active ? 'text-mirror-text' : 'text-mirror-muted'}`}>
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-start px-4 py-5 sm:items-center sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto w-full max-w-4xl mirror-shell p-5 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.16em] text-mirror-copper sm:text-xs sm:tracking-[0.18em]">
              Miroir d’Intuition
            </p>

            <h1 className="mt-3 text-[2.35rem] font-semibold leading-[0.95] text-mirror-ink sm:text-5xl lg:text-[4rem]">
              Décrivez votre situation du moment
            </h1>

            <p className="mt-3 text-[15px] leading-7 text-mirror-muted sm:mt-4 sm:max-w-2xl sm:text-lg sm:leading-8">
              Écrivez librement ce que vous vivez, ce qui vous trouble ou ce qui vous appelle. Il ne s’agit
              pas de bien écrire, mais de déposer ce qui est là.
            </p>
          </div>

          <Link
            href="/start"
            className="inline-flex w-fit rounded-[14px] border border-mirror-border px-4 py-2.5 text-sm font-medium text-mirror-muted transition hover:bg-[rgba(255,250,244,0.7)] hover:text-mirror-text sm:rounded-[16px]"
          >
            Retour
          </Link>
        </div>

        <div className="mt-7 grid gap-3 sm:mt-8">
          <label className="text-[15px] font-medium text-mirror-text sm:text-base" htmlFor="situation">
            Votre texte
          </label>

          <textarea
  id="situation"
  className="min-h-[320px] rounded-[22px] border border-[rgba(184,111,77,0.22)] bg-[rgba(255,252,248,0.78)] px-4 py-4 text-[15px] leading-7 text-mirror-text outline-none transition placeholder:text-[rgba(86,68,60,0.55)] focus:border-[rgba(184,111,77,0.38)] focus:bg-[rgba(255,252,248,0.95)] focus:shadow-[0_0_0_5px_rgba(184,111,77,0.08)] sm:min-h-[320px] sm:rounded-[24px] sm:px-6 sm:py-5 sm:text-lg sm:leading-8"
  value={situation}
  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setSituation(event.target.value)}
  placeholder="Exemple : Je sens qu’un changement est nécessaire, mais je n’arrive pas à savoir si c’est une intuition profonde ou simplement la peur de continuer comme avant..."
/>

          <div className="flex flex-col gap-2 text-[13px] text-mirror-muted sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <p>Minimum 40 caractères pour un éclairage plus précis.</p>
            <p>{characterCount} caractères</p>
          </div>

          {error ? <p className="text-sm text-[#9b5a42]">{error}</p> : null}
        </div>

        <div className="mt-6 sm:mt-7">
          <button
            className="inline-flex min-h-[56px] w-full items-center justify-center rounded-[18px] bg-mirror-terracotta px-6 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(168,93,61,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(168,93,61,0.28)] sm:min-h-[62px] sm:w-auto sm:rounded-[20px] sm:px-8 sm:text-base"
            type="button"
            onClick={handleStartAnalysis}
          >
            Voir ce qui se révèle en vous
          </button>
        </div>
      </section>
    </main>
  );
}
