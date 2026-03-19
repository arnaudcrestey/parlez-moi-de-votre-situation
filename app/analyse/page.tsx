'use client';

import Link from 'next/link';

export default function StartPage() {
  return (
    <main className="min-h-screen bg-[#ece4d8] px-6 py-8 text-[#241815] sm:px-8 lg:px-12">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full border border-[rgba(168,93,61,0.12)] bg-[rgba(255,248,242,0.72)] px-5 py-2 text-[12px] uppercase tracking-[0.22em] text-[#a05b3d]">
            MIROIR D’INTUITION · PREMIER ÉCLAIRAGE PERSONNEL
          </div>

          <h1 className="mt-10 max-w-[11ch] text-5xl font-semibold leading-[0.96] tracking-[-0.04em] text-[#201512] sm:text-6xl lg:text-[5.6rem]">
            Ce que vous ressentez mérite peut-être d’être écouté autrement.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-9 text-[#7a675f] sm:text-[1.32rem]">
            Décrivez librement votre situation du moment. Vous recevrez un premier éclairage structuré
            pour mieux distinguer ce qui se joue en vous : tension, élan, hésitation ou intuition profonde.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              href="/analyse"
              className="inline-flex min-h-[58px] items-center justify-center rounded-[20px] bg-[#9e5937] px-7 text-base font-medium text-white shadow-[0_12px_30px_rgba(122,78,53,0.16)] transition hover:translate-y-[-1px] hover:bg-[#8f4f31]"
            >
              Recevoir mon premier éclairage
            </Link>

            <p className="max-w-md text-sm leading-7 text-[#7d6a62]">
              Sans questionnaire. Sans surinterprétation. Juste un premier éclairage sensible et structuré.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[34rem] rounded-[34px] border border-[rgba(92,64,49,0.08)] bg-[rgba(251,246,240,0.76)] p-5 shadow-[0_24px_70px_rgba(78,56,43,0.08)] sm:p-7">
          <div className="rounded-[30px] border border-[rgba(92,64,49,0.07)] bg-[rgba(247,241,234,0.68)] p-6 sm:p-8">
            <p className="text-[12px] uppercase tracking-[0.24em] text-[#a05b3d]">MIROIR D’INTUITION</p>

            <div className="mt-5 border-t border-[rgba(160,91,61,0.14)] pt-7">
              <div className="rounded-[26px] border border-[rgba(92,64,49,0.08)] bg-[rgba(234,227,219,0.55)] p-6 sm:p-7">
                <p className="text-[12px] uppercase tracking-[0.22em] text-[#a05b3d]">PRÉSENCE</p>
                <p className="mt-4 text-3xl leading-[1.45] text-[#43342d]">
                  Un espace calme pour déposer ce que vous vivez et laisser émerger un premier axe de clarté.
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-[rgba(92,64,49,0.08)] bg-[rgba(255,251,246,0.5)] p-5">
                  <p className="text-sm text-[#806a61]">Écriture libre</p>
                  <p className="mt-3 text-[1.05rem] leading-8 text-[#43342d]">
                    Aucune série de questions. Vous partez simplement de votre vécu.
                  </p>
                </div>

                <div className="rounded-[24px] border border-[rgba(92,64,49,0.08)] bg-[rgba(255,251,246,0.5)] p-5">
                  <p className="text-sm text-[#806a61]">Lecture structurée</p>
                  <p className="mt-3 text-[1.05rem] leading-8 text-[#43342d]">
                    Nous repérons les tensions, les hésitations et les élans qui se dessinent.
                  </p>
                </div>

                <div className="rounded-[24px] border border-[rgba(92,64,49,0.08)] bg-[rgba(255,251,246,0.5)] p-5">
                  <p className="text-sm text-[#806a61]">Premier éclairage</p>
                  <p className="mt-3 text-[1.05rem] leading-8 text-[#43342d]">
                    Vous recevez une restitution claire, sensible et directement exploitable.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  'Mettre des mots sur le flou',
                  'Distinguer peur et intuition',
                  'Recevoir un premier axe de lecture'
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-[20px] border border-[rgba(92,64,49,0.08)] bg-[rgba(255,250,245,0.54)] px-5 py-4"
                  >
                    <span className="text-[1.02rem] text-[#2f211d]">{item}</span>
                    <span className="h-3 w-3 rounded-full bg-[#c79272]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
