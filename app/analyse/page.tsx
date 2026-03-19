'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const initialSituation = searchParams.get('situation') ?? '';

  const [situation, setSituation] = useState(initialSituation);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedSituation = window.localStorage.getItem('miroir-intuition:situation');
    if (!initialSituation && savedSituation) {
      setSituation(savedSituation);
    }
  }, [initialSituation]);

  const characterCount = useMemo(() => situation.trim().length, [situation]);
  const showForm = mode === 'input' || !initialSituation;

  useEffect(() => {
    if (!loading) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentStep((value: number) => {
        if (value >= steps.length - 1) {
          return value;
        }
        return value + 1;
      });
    }, 1200);

    return () => window.clearInterval(interval);
  }, [loading]);

  const handleStartAnalysis = useCallback(async () => {
    const trimmed = situation.trim();

    if (trimmed.length < 40) {
      setError('Quelques lignes supplémentaires aideront à vous offrir un éclairage plus juste.');
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

  useEffect(() => {
    if (!showForm && initialSituation && !loading) {
      void handleStartAnalysis();
    }
  }, [handleStartAnalysis, initialSituation, loading, showForm]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center px-5 py-8 sm:px-8 lg:px-10">
        <section className="mx-auto w-full max-w-3xl mirror-shell p-8 sm:p-12">
          <p className="text-xs uppercase tracking-[0.18em] text-mirror-copper">Analyse en cours</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-mirror-ink sm:text-5xl">
            Nous préparons votre premier éclairage.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-mirror-muted">
            Prenez une respiration. L’analyse se structure doucement à partir de ce que vous avez confié.
          </p>

          <div className="mt-10 space-y-6">
            <div className="h-2 overflow-hidden rounded-full bg-[rgba(220,199,174,0.42)]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#b86f4d,#8e4b32)] transition-all duration-700"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="grid gap-4">
              {steps.map((step, index) => {
                const active = index <= currentStep;
                return (
                  <div
                    key={step}
                    className={`flex items-center gap-4 rounded-[22px] border px-5 py-4 transition-all duration-500 ${
                      active
                        ? 'border-[rgba(184,111,77,0.18)] bg-[rgba(255,250,244,0.92)]'
                        : 'border-transparent bg-[rgba(255,248,240,0.42)]'
                    }`}
                  >
                    <div
                      className={`h-3 w-3 rounded-full transition-all duration-500 ${
                        active ? 'bg-mirror-copper shadow-[0_0_0_6px_rgba(184,111,77,0.12)]' : 'bg-mirror-sand'
                      }`}
                    />
                    <p className={`text-base ${active ? 'text-mirror-text' : 'text-mirror-muted'}`}>{step}</p>
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
    <main className="flex min-h-screen items-center px-5 py-8 sm:px-8 lg:px-10">
      <section className="mx-auto w-full max-w-3xl mirror-shell p-8 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-mirror-copper">Miroir d’Intuition</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-mirror-ink sm:text-5xl">
              Décrivez votre situation du moment
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-mirror-muted">
              Quelques lignes suffisent. Écrivez simplement ce que vous vivez, ce qui vous trouble ou ce qui vous appelle.
            </p>
          </div>
          <Link
            href="/start"
            className="rounded-2xl border border-mirror-border px-4 py-3 text-sm font-medium text-mirror-muted transition hover:bg-[rgba(255,250,244,0.7)] hover:text-mirror-text"
          >
            Retour
          </Link>
        </div>

        <div className="mt-10 grid gap-4">
          <label className="mirror-label" htmlFor="situation">
            Votre texte
          </label>
          <textarea
            id="situation"
            className="mirror-input min-h-[240px] resize-none leading-7"
            value={situation}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setSituation(event.target.value)}
            placeholder="Exemple : Je sens qu’un changement est nécessaire, mais je n’arrive pas à savoir si c’est une intuition profonde ou simplement la peur de continuer comme avant..."
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-mirror-muted">Minimum 40 caractères pour un éclairage plus précis.</p>
            <p className="text-sm text-mirror-muted">{characterCount} caractères</p>
          </div>
          {error ? <p className="text-sm text-[#9b5a42]">{error}</p> : null}
        </div>

        <div className="mt-8">
          <button className="mirror-button w-full sm:w-auto" type="button" onClick={handleStartAnalysis}>
            Recevoir mon éclairage
          </button>
        </div>
      </section>
    </main>
  );
}
