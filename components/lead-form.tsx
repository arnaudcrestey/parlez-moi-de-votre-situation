'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useMemo, useState } from 'react';
import type { AnalysisResult } from '@/lib/mirror-analysis';

const initialState = {
  firstName: '',
  email: ''
};

type LeadFormProps = {
  situation: string;
  analysis: AnalysisResult;
};

export function LeadForm({ situation, analysis }: LeadFormProps) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const canSubmit = useMemo(() => {
    return form.firstName.trim().length >= 2 && /\S+@\S+\.\S+/.test(form.email);
  }, [form]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      setStatus('error');
      setMessage('Veuillez renseigner un prénom et une adresse e-mail valides.');
      return;
    }

    try {
      setStatus('loading');
      setMessage('');

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          email: form.email.trim(),
          situation,
          analysisResult: analysis
        })
      });

      if (!response.ok) {
        throw new Error('send_failed');
      }

      setStatus('success');
      setMessage('Votre demande a bien été envoyée. Nous vous transmettrons votre éclairage complet par e-mail très prochainement.');
      setForm(initialState);
    } catch {
      setStatus('error');
      setMessage('Une difficulté temporaire est survenue. Merci de réessayer dans un instant.');
    }
  };

  if (status === 'success') {
    return (
      <div className="mirror-shell p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.18em] text-mirror-copper">Envoi confirmé</p>
        <h2 className="mt-3 text-3xl font-semibold text-mirror-ink">Votre demande a bien été envoyée.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-mirror-muted">
          Nous vous transmettrons votre éclairage complet par e-mail très prochainement.
        </p>
      </div>
    );
  }

  return (
    <div className="mirror-shell p-8 sm:p-10">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-mirror-copper">Par e-mail</p>
        <h2 className="mt-3 text-3xl font-semibold text-mirror-ink">
          Recevoir mon éclairage complet par e-mail
        </h2>
        <p className="mt-4 text-base leading-7 text-mirror-muted">
          Votre éclairage vous sera envoyé par e-mail. Vos informations restent confidentielles.
        </p>
      </div>

      <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <label className="mirror-label" htmlFor="firstName">
            Prénom
          </label>
          <input
            id="firstName"
            className="mirror-input"
            value={form.firstName}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setForm((current) => ({ ...current, firstName: event.target.value }))
            }
            placeholder="Votre prénom"
          />
        </div>
        <div>
          <label className="mirror-label" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="mirror-input"
            value={form.email}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            placeholder="votre@email.com"
          />
        </div>
        <div className="sm:col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <button className="mirror-button w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60" disabled={status === 'loading'} type="submit">
            {status === 'loading' ? 'Envoi en cours…' : 'Recevoir mon éclairage complet'}
          </button>
          {message ? <p className="text-sm text-[#9b5a42]">{message}</p> : null}
        </div>
      </form>
    </div>
  );
}
