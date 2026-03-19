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

    window.localStorage.removeItem('miroir-intuition:situation');
    window.localStorage.removeItem('miroir-intuition:analysis');
  }, []);

  if (!analysis || !situation) {
    return (
      <main className="flex min-h-screen items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="mx-auto w-full max-w-2xl mirror-shell p-6 text-center sm:p-10">
          <p className="text-[10px] uppercase tracking-[0.16em] text-mirror-copper sm:text-xs sm:tracking-[0.18em]">
            Aucune analyse disponible
          </p>

          <h1 className="mt-4 text-3xl font-semibold text-mirror-ink sm:text-4xl">
            Recommençons depuis le début.
          </h1>

          <p className="mt-4 text-[15px] leading-7 text-mirror-muted sm:text-base">
            Nous n’avons pas retrouvé votre situation ou votre éclairage. Vous pouvez relancer le
            parcours en quelques instants.
          </p>

          <div className="mt-7">
            <Link
              className="inline-flex min-h-[56px] items-center justify-center rounded-[18px] bg-mirror-terracotta px-6 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(168,93,61,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(168,93,61,0.28)] sm:min-h-[60px] sm:px-8 sm:text-base"
              href="/start"
            >
              Revenir à l’accueil
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:gap-8 lg:gap-10">
        <section className="mirror-shell p-5 sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8">
            <div className="space-y-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-mirror-copper sm:text-xs sm:tracking-[0.18em]">
                  Votre lecture
                </p>

                <h1 className="mt-3 text-[2rem] font-semibold leading-[0.96] text-mirror-ink sm:text-[2.5rem] lg:text-[3.25rem]">
                  Voici votre premier éclairage
                </h1>

                <p className="mt-4 max-w-xl text-[15px] leading-7 text-mirror-muted sm:text-base sm:leading-8">
                  Une mise en lumière douce et structurée de votre situation, pour vous aider à voir plus clair dans ce qui se révèle en vous.
                </p>
              </div>

              <div className="rounded-[22px] border border-mirror-border bg-[rgba(255,250,244,0.9)] p-5 sm:rounded-[24px] sm:p-6 lg:rounded-[28px]">
                <p className="text-[10px] uppercase tracking-[0.16em] text-mirror-copper sm:text-xs sm:tracking-[0.18em]">
                  Votre situation
                </p>
                <p className="mt-4 text-[15px] leading-7 text-mirror-brown sm:text-base sm:leading-8">
                  {situation}
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {sections.map(({ key, title }, index) => (
                <article
                  key={key}
                  className="rounded-[22px] border border-mirror-border bg-[rgba(255,250,244,0.88)] p-5 shadow-soft sm:rounded-[24px] sm:p-6 lg:rounded-[28px]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-mirror-copper sm:text-xs sm:tracking-[0.18em]">
                        0{index + 1}
                      </p>
                      <h2 className="mt-3 text-[1.35rem] font-semibold leading-tight text-mirror-ink sm:text-[1.55rem] lg:text-2xl">
                        {title}
                      </h2>
                    </div>
                    <div className="mt-1 h-10 w-px bg-[linear-gradient(180deg,rgba(184,111,77,0.45),transparent)] sm:h-12" />
                  </div>

                  <p className="mt-4 text-[15px] leading-7 text-mirror-muted sm:mt-5 sm:text-base sm:leading-8">
                    {analysis[key]}
                  </p>
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
