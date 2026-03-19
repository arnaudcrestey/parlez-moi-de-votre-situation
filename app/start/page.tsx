import Link from 'next/link';

const benefits = [
  'Mettre des mots sur le flou',
  'Distinguer peur et intuition',
  'Recevoir un premier éclairage'
];

export default function StartPage() {
  return (
    <main className="relative isolate min-h-screen px-5 py-6 sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col justify-between gap-10 lg:gap-14">
        <section className="grid items-center gap-8 pt-6 lg:grid-cols-[1.08fr_0.92fr] lg:pt-10">
          <div className="animate-reveal space-y-8">
            <div className="inline-flex rounded-full border border-mirror-border bg-[rgba(255,250,244,0.82)] px-4 py-2 text-xs uppercase tracking-[0.18em] text-mirror-copper shadow-soft">
              Miroir d’Intuition · Premier éclairage personnel
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] text-mirror-ink sm:text-6xl lg:text-[4.9rem]">
                Ce que vous ressentez mérite peut-être d’être écouté autrement.
              </h1>

              <p className="max-w-2xl text-lg leading-8 text-mirror-muted sm:text-xl">
                Décrivez librement votre situation du moment. Recevez un premier éclairage structuré pour
                mieux distinguer ce qui se joue en vous.
              </p>
            </div>

            <div className="pt-2">
              <Link className="mirror-button w-full sm:w-auto" href="/analyse">
                Commencer
              </Link>
            </div>
          </div>

          <div className="animate-reveal [animation-delay:120ms]">
            <div className="mirror-shell min-h-[440px] p-7 sm:p-9">
              <div className="flex h-full flex-col justify-between gap-8 rounded-[28px] border border-[rgba(90,60,40,0.08)] bg-[linear-gradient(180deg,rgba(255,250,244,0.88),rgba(255,246,238,0.58))] p-6 sm:p-8">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-mirror-copper">
                    Miroir d’Intuition
                  </p>
                  <div className="h-px w-full bg-[linear-gradient(90deg,rgba(184,111,77,0.6),rgba(220,199,174,0.2),transparent)]" />
                </div>

                <div className="space-y-5">
                  <div className="rounded-[26px] border border-[rgba(90,60,40,0.1)] bg-[rgba(246,239,231,0.85)] p-6">
                    <p className="text-sm uppercase tracking-[0.16em] text-mirror-copper">Présence</p>
                    <p className="mt-3 text-2xl font-medium leading-9 text-mirror-brown">
                      Un espace calme pour déposer ce que vous vivez et laisser émerger un premier axe de
                      clarté.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-mirror-border bg-[rgba(255,250,244,0.9)] p-5">
                      <p className="text-sm text-mirror-muted">Écriture libre</p>
                      <p className="mt-2 text-base font-medium leading-7 text-mirror-text">
                        Aucune série de questions. Vous partez simplement de votre vécu.
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-mirror-border bg-[rgba(255,250,244,0.82)] p-5">
                      <p className="text-sm text-mirror-muted">Lecture sensible</p>
                      <p className="mt-2 text-base font-medium leading-7 text-mirror-text">
                        Une lecture claire pour faire émerger tensions, hésitations et premiers élans.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center justify-between rounded-[22px] border border-mirror-border bg-[rgba(255,250,244,0.76)] px-5 py-4"
                    >
                      <span className="text-sm font-medium text-mirror-text">{benefit}</span>
                      <span className="h-2.5 w-2.5 rounded-full bg-mirror-terracotta/70" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
