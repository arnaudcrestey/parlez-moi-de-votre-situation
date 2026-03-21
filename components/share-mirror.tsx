'use client';

import { useMemo, useState } from 'react';

export function ShareMirror() {
  const [copied, setCopied] = useState(false);

  const shareMessage = useMemo(
    () =>
      "Je viens de découvrir Miroir d’Intuition. C’est une expérience simple et intuitive pour mettre des mots sur une période floue et faire apparaître un premier éclairage.. Si tu veux, tu peux faire ton propre miroir ici : https://parlez-moi-de-votre-situation.vercel.app/start",
    []
  );

  const encodedMessage = encodeURIComponent(shareMessage);
  const encodedLinkedInUrl = encodeURIComponent('https://parlez-moi-de-votre-situation.vercel.app/start');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="mirror-shell p-5 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[10px] uppercase tracking-[0.16em] text-mirror-copper sm:text-xs sm:tracking-[0.18em]">
          À partager
        </p>

        <h2 className="mt-3 text-[1.9rem] font-semibold leading-tight text-mirror-ink sm:text-[2.2rem] lg:text-[2.5rem]">
          Faire découvrir Miroir d’Intuition
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-mirror-muted sm:text-base sm:leading-8">
          Partagez Miroir d’Intuition avec une personne qui traverse peut-être elle aussi une période de flou.
        </p>

        <div className="mx-auto mt-6 max-w-3xl rounded-[22px] border border-mirror-border bg-[rgba(255,250,244,0.88)] p-5 text-left sm:rounded-[24px] sm:p-6">
          <p className="text-[10px] uppercase tracking-[0.16em] text-mirror-copper sm:text-xs sm:tracking-[0.18em]">
            Aperçu du message
          </p>

          <p className="mt-3 text-[15px] leading-7 text-mirror-text sm:text-base sm:leading-8">
            {shareMessage}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/?text=${encodedMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center rounded-[18px] border border-mirror-border bg-[rgba(255,250,244,0.82)] px-5 text-sm font-medium text-mirror-text transition hover:bg-[rgba(255,250,244,1)]"
          >
            WhatsApp
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex min-h-[48px] items-center justify-center rounded-[18px] border border-mirror-border bg-[rgba(255,250,244,0.82)] px-5 text-sm font-medium text-mirror-text transition hover:bg-[rgba(255,250,244,1)]"
          >
            {copied ? 'Message copié' : 'Copier le message'}
          </button>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedLinkedInUrl}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center rounded-[18px] border border-mirror-border bg-[rgba(255,250,244,0.82)] px-5 text-sm font-medium text-mirror-text transition hover:bg-[rgba(255,250,244,1)]"
          >
            Facebook
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedLinkedInUrl}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center rounded-[18px] border border-mirror-border bg-[rgba(255,250,244,0.82)] px-5 text-sm font-medium text-mirror-text transition hover:bg-[rgba(255,250,244,1)]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
