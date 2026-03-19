import Link from 'next/link';

const benefits = [
  'Mettre des mots sur le flou',
  'Distinguer peur et intuition',
  'Recevoir un premier éclairage'
];

export default function StartPage() {
  return (
    <main className="relative isolate min-h-screen px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col justify-between gap-8 lg:gap-10">
        <section className="grid items-center gap-6 pt-2 lg:grid-cols-[1.05fr_0.95fr] lg:pt-4">
          <div className="animate-reveal space-y-6">
            <div className="inline-flex rounded-full border border-mirror-border bg-[rgba(255,250,244,0.82)] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-mirror-copper shadow-soft sm:text-xs">
              Miroir d’Intuition · Premier éclairage personnel
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-[3rem] font-semibold leading-[0.96] text-mirror-ink sm:text-[3.6rem] lg:text-[4.4rem]">
                Ce que vous ressentez mérite peut-être d’être écouté autrement.
              </h1>

              <p className="max-w-2xl text-base leading-7 text-mirror-muted sm:text-lg sm:leading-8">
                Décrivez librement votre situation du moment. Recevez un premier éclairage structuré pour
                mieux distinguer ce qui se joue en vous.
              </p>
            </div>

            <div className="pt-1">
              <Link
                href="/analyse"
                className="inline-flex min-h-[60px] items-center justify-center rounded-[20px] bg-mirror-terracotta px-8 text-base font-semibold text-white shadow-[0_14px_30px_rgba(168,93,61,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(168,93,61,0.28)] sm:min-h-[64px] sm:px-9 sm:text-lg"
              >
                Décrire ma situation
              </Link>
            </div>
          </div>

          <div className="animate-reveal [animation-delay:120ms]">
            <div className="mirror-shell min-h-[380px] p-5 sm:min-h-[410px] sm:p-6 lg:min-h-[420px] lg:p-7">
              <div className="flex h-full flex-col justify-between gap-6 rounded-[26px] border border-[rgba(90,60,40,0.08)] bg-[linear-gradient(180deg,rgba(255,250,244,0.88),rgba(255,246,238,0.58))] p-5 sm:p-6 lg:p-7">
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-mirror-copper sm:text-xs">
                    Miroir d’Intuition
                  </p>
                  <div className="h-px w-full bg-[linear-gradient(90deg,rgba(184,111,77,0.6),rgba(220,199,174,0.2),transparent)]" />
                </div>

                <div className="space-y-4">
                  <div className="rounded-[24px] border border-[rgba(90,60,40,0.1)] bg-[rgba(246,239,231,0.85)] p-5 sm:p-6">
                    <p className="text-xs uppercase tracking-[0.16em] text-mirror-copper sm:text-sm">
                      Présence
                    </p>
                    <p className="mt-3 text-xl font-medium leading-8 text-mirror-brown sm:text-[1.7rem] sm:leading-9">
                      Un espace calme pour déposer ce que vous vivez et laisser émerger un premier axe de
                      clarté.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-mirror-border bg-[rgba(255,250,244,0.9)] p-4 sm:p-5">
                      <p className="text-sm text-mirror-muted">Écriture libre</p>
                      <p className="mt-2 text-[15px] font-medium leading-7 text-mirror-text sm:text-base">
                        Aucune série de questions. Vous partez simplement de votre vécu.
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-mirror-border bg-[rgba(255,250,244,0.82)] p-4 sm:p-5">
                      <p className="text-sm text-mirror-muted">Lecture sensible</p>
                      <p className="mt-2 text-[15px] font-medium leading-7 text-mirror-text sm:text-base">
                        Une lecture claire pour faire émerger tensions, hésitations et premiers élans.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center justify-between rounded-[20px] border border-mirror-border bg-[rgba(255,250,244,0.76)] px-4 py-3.5 sm:px-5 sm:py-4"
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
