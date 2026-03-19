'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LeadForm } from '@/components/lead-form';
import type { AnalysisResult } from '@/lib/mirror-analysis';

const sections: Array<{ key: keyof AnalysisResult; title: string }> = [
  { key: 'summary', title: 'Ce que vous semblez traverser' },
  {
    key: 'fear',
    title: 'Ce qui relève peut-être de la peur ou de la surcharge mentale'
  },
  {
    key: 'intuition',
    title: 'Ce que votre intuition essaie peut-être de vous montrer'
  },
  { key: 'nextStep', title: 'La piste douce à explorer maintenant' }
];

export default function ResultatPage() {
  const [situation, setSituation] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const storedSituation = window.localStorage.getItem('miroir-intuition:situation') ?? '';
    const storedAnalysis = window.localStorage.getItem('miroir-intuition:analysis');

    setSituation(storedSituation);

    if (storedAnalysis) {
      setAnalysis(JSON.parse(storedAnalysis) as AnalysisResult);
    }
  }, []);

  if (!analysis || !situation) {
    return (
      <main className="flex min-h-screen items-center px-5 py-8 sm:px-8 lg:px-10">
        <section className="mx-auto w-full max-w-2xl mirror-shell p-8 text-center sm:p-12">
          <p className="text-xs uppercase tracking-[0.18em] text-mirror-copper">Aucune analyse disponible</p>
          <h1 className="mt-4 text-4xl font-semibold text-mirror-ink">Recommençons depuis le début.</h1>
          <p className="mt-4 text-base leading-7 text-mirror-muted">
            Nous n’avons pas retrouvé votre situation ou votre éclairage. Vous pouvez relancer le parcours en quelques instants.
          </p>
          <div className="mt-8">
            <Link className="mirror-button" href="/start">
              Revenir à l’accueil
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:gap-10">
        <section className="mirror-shell p-8 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-mirror-copper">Votre lecture</p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-mirror-ink sm:text-5xl">
                Voici votre premier éclairage
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-mirror-muted">
                Une lecture sensible et structurée de ce que vous avez partagé, pour vous aider à distinguer le bruit intérieur de ce qui cherche réellement à émerger.
              </p>

              <div className="mt-8 rounded-[28px] border border-mirror-border bg-[rgba(255,250,244,0.9)] p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-mirror-copper">Votre situation</p>
                <p className="mt-4 text-base leading-8 text-mirror-brown">{situation}</p>
              </div>
            </div>

            <div className="grid gap-4">
              {sections.map(({ key, title }, index) => (
                <article
                  key={key}
                  className="rounded-[28px] border border-mirror-border bg-[rgba(255,250,244,0.88)] p-6 shadow-soft"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-mirror-copper">0{index + 1}</p>
                      <h2 className="mt-3 text-2xl font-semibold leading-tight text-mirror-ink">{title}</h2>
                    </div>
                    <div className="mt-1 h-12 w-px bg-[linear-gradient(180deg,rgba(184,111,77,0.45),transparent)]" />
                  </div>
                  <p className="mt-5 text-base leading-8 text-mirror-muted">{analysis[key]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <LeadForm situation={situation} analysis={analysis} />
      </div>
    </main>
  );
}
