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
      <main className="flex min-h-screen items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="mx-auto w-full max-w-3xl mirror-shell p-6 sm:p-8 lg:p-10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-mirror-copper sm:text-xs">
            Analyse en cours
          </p>

          <h1 className="mt-4 text-3xl font-semibold leading-tight text-mirror-ink sm:text-4xl lg:text-5xl">
            Nous préparons votre premier éclairage.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-mirror-muted">
            Prenez une respiration. L’analyse se structure doucement à partir de ce que vous avez confié.
          </p>

          <div className="mt-8 space-y-5">
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
                    className={`flex items-center gap-4 rounded-[20px] border px-4 py-4 transition-all duration-500 ${
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
    <main className="flex min-h-screen items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="mx-auto w-full max-w-4xl mirror-shell p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.18em] text-mirror-copper sm:text-xs">
              Miroir d’Intuition
            </p>

            <h1 className="mt-3 text-[2.6rem] font-semibold leading-[0.98] text-mirror-ink sm:text-5xl lg:text-[4rem]">
              Décrivez votre situation du moment
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-mirror-muted sm:text-lg sm:leading-8">
              Écrivez librement ce que vous vivez, ce qui vous trouble ou ce qui vous appelle. Il ne s’agit
              pas de bien écrire, mais de déposer ce qui est là.
            </p>
          </div>

          <Link
            href="/start"
            className="rounded-[16px] border border-mirror-border px-4 py-2.5 text-sm font-medium text-mirror-muted transition hover:bg-[rgba(255,250,244,0.7)] hover:text-mirror-text"
          >
            Retour
          </Link>
        </div>

        <div className="mt-8 grid gap-3">
          <label className="text-base font-medium text-mirror-text" htmlFor="situation">
            Votre texte
          </label>

          <textarea
            id="situation"
            className="min-h-[220px] rounded-[24px] border border-[rgba(184,111,77,0.22)] bg-[rgba(255,252,248,0.78)] px-5 py-4 text-base leading-8 text-mirror-text outline-none transition placeholder:text-[rgba(86,68,60,0.55)] focus:border-[rgba(184,111,77,0.38)] focus:bg-[rgba(255,252,248,0.95)] focus:shadow-[0_0_0_5px_rgba(184,111,77,0.08)] sm:min-h-[240px] sm:px-6 sm:py-5 sm:text-lg"
            value={situation}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setSituation(event.target.value)}
            placeholder="Exemple : Je sens qu’un changement est nécessaire, mais je n’arrive pas à savoir si c’est une intuition profonde ou simplement la peur de continuer comme avant..."
          />

          <div className="flex flex-col gap-2 text-sm text-mirror-muted sm:flex-row sm:items-center sm:justify-between">
            <p>Minimum 40 caractères pour un éclairage plus précis.</p>
            <p>{characterCount} caractères</p>
          </div>

          {error ? <p className="text-sm text-[#9b5a42]">{error}</p> : null}
        </div>

        <div className="mt-7">
          <button
            className="inline-flex min-h-[58px] items-center justify-center rounded-[20px] bg-mirror-terracotta px-7 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(168,93,61,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(168,93,61,0.28)] sm:min-h-[62px] sm:px-8 sm:text-base"
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
