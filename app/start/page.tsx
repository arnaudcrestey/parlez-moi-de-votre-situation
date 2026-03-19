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
        <section className="grid items-start gap-6 pt-2 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-4">
          <div className="animate-reveal space-y-5 lg:space-y-6">
            <div className="inline-flex rounded-full border border-mirror-border bg-[rgba(255,250,244,0.82)] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-mirror-copper shadow-soft sm:px-4 sm:py-2 sm:text-xs lg:px-4 lg:py-2 lg:text-[11px] lg:tracking-[0.18em]">
              Miroir d’Intuition · Premier éclairage personnel
            </div>

            <div className="space-y-3 lg:space-y-4">
              <h1 className="max-w-3xl text-[2.6rem] font-semibold leading-[0.95] text-mirror-ink sm:text-[3rem] lg:text-[4.4rem] lg:leading-[0.96]">
                Ce que vous ressentez mérite peut-être d’être écouté autrement.
              </h1>

              <p className="max-w-2xl text-[15px] leading-7 text-mirror-muted sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                Décrivez librement votre situation du moment. Recevez un premier éclairage structuré pour
                mieux distinguer ce qui se joue en vous.
              </p>
            </div>

            <div className="pt-1">
              <Link
                href="/analyse"
                className="inline-flex min-h-[56px] w-full items-center justify-center rounded-[18px] bg-mirror-terracotta px-6 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(168,93,61,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(168,93,61,0.28)] sm:min-h-[60px] sm:w-auto sm:px-8 sm:text-base lg:min-h-[64px] lg:rounded-[20px] lg:px-8 lg:text-lg"
              >
                Décrire ma situation
              </Link>
            </div>
          </div>

          <div className="animate-reveal [animation-delay:120ms]">
            <div className="mirror-shell p-4 sm:p-5 lg:min-h-[420px] lg:p-7">
              <div className="flex h-full flex-col justify-between gap-4 rounded-[22px] border border-[rgba(90,60,40,0.08)] bg-[linear-gradient(180deg,rgba(255,250,244,0.88),rgba(255,246,238,0.58))] p-4 sm:gap-5 sm:rounded-[24px] sm:p-5 lg:gap-6 lg:rounded-[26px] lg:p-7">
                <div className="space-y-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-mirror-copper sm:text-[11px] lg:text-xs lg:tracking-[0.18em]">
                    Miroir d’Intuition
                  </p>
                  <div className="h-px w-full bg-[linear-gradient(90deg,rgba(184,111,77,0.6),rgba(220,199,174,0.2),transparent)]" />
                </div>

                <div className="space-y-3 lg:space-y-4">
                  <div className="rounded-[20px] border border-[rgba(90,60,40,0.1)] bg-[rgba(246,239,231,0.85)] p-4 sm:rounded-[22px] sm:p-5 lg:rounded-[24px] lg:p-6">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-mirror-copper sm:text-xs lg:text-sm lg:tracking-[0.16em]">
                      Présence
                    </p>
                    <p className="mt-2 text-[1.15rem] font-medium leading-7 text-mirror-brown sm:text-[1.25rem] sm:leading-8 lg:mt-3 lg:text-[1.7rem] lg:leading-9">
                      Un espace calme pour déposer ce que vous vivez et laisser émerger un premier axe de
                      clarté.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[18px] border border-mirror-border bg-[rgba(255,250,244,0.9)] p-4 sm:rounded-[20px] lg:rounded-[22px] lg:p-5">
                      <p className="text-sm text-mirror-muted">Écriture libre</p>
                      <p className="mt-2 text-[14px] font-medium leading-6 text-mirror-text sm:text-[15px] sm:leading-7 lg:text-base">
                        Aucune série de questions. Vous partez simplement de votre vécu.
                      </p>
                    </div>

                    <div className="rounded-[18px] border border-mirror-border bg-[rgba(255,250,244,0.82)] p-4 sm:rounded-[20px] lg:rounded-[22px] lg:p-5">
                      <p className="text-sm text-mirror-muted">Lecture sensible</p>
                      <p className="mt-2 text-[14px] font-medium leading-6 text-mirror-text sm:text-[15px] sm:leading-7 lg:text-base">
                        Une lecture claire pour faire émerger tensions, hésitations et premiers élans.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2.5 lg:gap-3">
                  {benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center justify-between rounded-[18px] border border-mirror-border bg-[rgba(255,250,244,0.76)] px-4 py-3 sm:rounded-[20px] sm:px-4 sm:py-3.5 lg:rounded-[20px] lg:px-5 lg:py-4"
                    >
                      <span className="text-[13px] font-medium text-mirror-text sm:text-sm">
                        {benefit}
                      </span>
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
