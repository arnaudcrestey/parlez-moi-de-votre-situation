'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AnalysisResult } from '@/lib/mirror-analysis';

const initialState = {
  firstName: '',
  email: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  birthHour: '',
  birthMinute: '',
  birthCity: ''
};

type LeadFormProps = {
  situation: string;
  analysis: AnalysisResult;
};

export function LeadForm({ situation, analysis }: LeadFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const canSubmit = useMemo(() => {
    return (
      form.firstName.trim().length >= 2 &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.birthDay.trim().length >= 1 &&
      form.birthMonth.trim().length >= 1 &&
      form.birthYear.trim().length === 4 &&
      form.birthCity.trim().length >= 2
    );
  }, [form]);

  const handleChange =
    (field: keyof typeof initialState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;

      if (
        field === 'birthDay' ||
        field === 'birthMonth' ||
        field === 'birthYear' ||
        field === 'birthHour' ||
        field === 'birthMinute'
      ) {
        value = value.replace(/\D/g, '');
      }

      if (
        field === 'birthDay' ||
        field === 'birthMonth' ||
        field === 'birthHour' ||
        field === 'birthMinute'
      ) {
        value = value.slice(0, 2);
      }

      if (field === 'birthYear') {
        value = value.slice(0, 4);
      }

      setForm((current) => ({
        ...current,
        [field]: value
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      setStatus('error');
      setMessage('Merci de renseigner les informations essentielles pour recevoir votre lecture.');
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
          birthDay: form.birthDay.trim(),
          birthMonth: form.birthMonth.trim(),
          birthYear: form.birthYear.trim(),
          birthHour: form.birthHour.trim(),
          birthMinute: form.birthMinute.trim(),
          birthCity: form.birthCity.trim(),
          situation,
          analysisResult: analysis
        })
      });

      if (!response.ok) {
        throw new Error('send_failed');
      }

      router.push('/confirmation');
    } catch {
      setStatus('error');
      setMessage('Une difficulté temporaire est survenue. Merci de réessayer dans un instant.');
    }
  };

  return (
    <div className="rounded-[28px] border border-[rgba(90,60,40,0.08)] bg-[linear-gradient(180deg,rgba(255,250,244,0.92),rgba(255,246,238,0.72))] p-5 shadow-soft sm:p-8 lg:p-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.16em] text-mirror-copper sm:text-xs sm:tracking-[0.18em]">
          Cabinet Astrae
        </p>

        <h2 className="mt-3 text-[1.9rem] font-semibold leading-tight text-mirror-ink sm:text-[2.2rem] lg:text-[2.5rem]">
          Approfondir votre lecture avec le thème astral
        </h2>

        <p className="mt-4 text-[15px] leading-7 text-mirror-muted sm:text-base sm:leading-8">
          Pour aller plus loin, le <span className="font-semibold text-mirror-terracotta">Cabinet Astrae</span> peut éclairer votre situation à travers une lecture plus personnelle, enrichie par votre thème astral.
        </p>

        <p className="mt-4 text-[15px] leading-7 text-mirror-brown sm:text-base sm:leading-8">
          🎁 Recevez <span className="font-semibold text-mirror-terracotta">gratuitement</span> un premier retour à partir de vos informations de naissance.
        </p>
      </div>

      <form className="mx-auto mt-8 max-w-3xl space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="min-h-[58px] rounded-[18px] border border-[rgba(184,111,77,0.16)] bg-[rgba(255,252,248,0.85)] px-5 text-[16px] text-mirror-text outline-none transition placeholder:text-[rgba(86,68,60,0.55)] focus:border-[rgba(184,111,77,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(184,111,77,0.08)]"
            value={form.firstName}
            onChange={handleChange('firstName')}
            placeholder="Votre prénom"
          />

          <input
            type="email"
            className="min-h-[58px] rounded-[18px] border border-[rgba(184,111,77,0.16)] bg-[rgba(255,252,248,0.85)] px-5 text-[16px] text-mirror-text outline-none transition placeholder:text-[rgba(86,68,60,0.55)] focus:border-[rgba(184,111,77,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(184,111,77,0.08)]"
            value={form.email}
            onChange={handleChange('email')}
            placeholder="Votre e-mail"
          />
        </div>

        <div className="space-y-3">
          <p className="text-[14px] font-medium text-mirror-text">Date de naissance</p>
          <div className="grid grid-cols-3 gap-3">
            <input className="min-h-[58px] rounded-[18px] border border-[rgba(184,111,77,0.16)] bg-[rgba(255,252,248,0.85)] px-3 text-center text-[16px] text-mirror-text outline-none transition placeholder:text-[rgba(86,68,60,0.55)] focus:border-[rgba(184,111,77,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(184,111,77,0.08)]" value={form.birthDay} onChange={handleChange('birthDay')} placeholder="Jour" inputMode="numeric" />
            <input className="min-h-[58px] rounded-[18px] border border-[rgba(184,111,77,0.16)] bg-[rgba(255,252,248,0.85)] px-3 text-center text-[16px] text-mirror-text outline-none transition placeholder:text-[rgba(86,68,60,0.55)] focus:border-[rgba(184,111,77,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(184,111,77,0.08)]" value={form.birthMonth} onChange={handleChange('birthMonth')} placeholder="Mois" inputMode="numeric" />
            <input className="min-h-[58px] rounded-[18px] border border-[rgba(184,111,77,0.16)] bg-[rgba(255,252,248,0.85)] px-3 text-center text-[16px] text-mirror-text outline-none transition placeholder:text-[rgba(86,68,60,0.55)] focus:border-[rgba(184,111,77,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(184,111,77,0.08)]" value={form.birthYear} onChange={handleChange('birthYear')} placeholder="Année" inputMode="numeric" />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[14px] font-medium text-mirror-text">Heure de naissance</p>
          <div className="grid grid-cols-2 gap-3">
            <input className="min-h-[58px] rounded-[18px] border border-[rgba(184,111,77,0.16)] bg-[rgba(255,252,248,0.85)] px-3 text-center text-[16px] text-mirror-text outline-none transition placeholder:text-[rgba(86,68,60,0.55)] focus:border-[rgba(184,111,77,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(184,111,77,0.08)]" value={form.birthHour} onChange={handleChange('birthHour')} placeholder="Heure" inputMode="numeric" />
            <input className="min-h-[58px] rounded-[18px] border border-[rgba(184,111,77,0.16)] bg-[rgba(255,252,248,0.85)] px-3 text-center text-[16px] text-mirror-text outline-none transition placeholder:text-[rgba(86,68,60,0.55)] focus:border-[rgba(184,111,77,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(184,111,77,0.08)]" value={form.birthMinute} onChange={handleChange('birthMinute')} placeholder="Minute" inputMode="numeric" />
          </div>
        </div>

        <input
          className="min-h-[58px] w-full rounded-[18px] border border-[rgba(184,111,77,0.16)] bg-[rgba(255,252,248,0.85)] px-5 text-[16px] text-mirror-text outline-none transition placeholder:text-[rgba(86,68,60,0.55)] focus:border-[rgba(184,111,77,0.34)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(184,111,77,0.08)]"
          value={form.birthCity}
          onChange={handleChange('birthCity')}
          placeholder="Ville de naissance"
        />

        <div className="pt-2">
          <button
            className="inline-flex min-h-[60px] w-full items-center justify-center rounded-[20px] bg-mirror-terracotta px-6 text-[16px] font-semibold text-white shadow-[0_14px_30px_rgba(168,93,61,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(168,93,61,0.28)]"
            disabled={status === 'loading'}
            type="submit"
          >
            {status === 'loading' ? 'Envoi en cours…' : 'Recevoir ma lecture approfondie'}
          </button>

          {message ? <p className="mt-4 text-sm text-[#9b5a42]">{message}</p> : null}
        </div>
      </form>
    </div>
  );
}
