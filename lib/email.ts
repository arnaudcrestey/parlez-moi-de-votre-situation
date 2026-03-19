import type { AnalysisResult } from '@/lib/mirror-analysis';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export function buildLeadEmail({
  firstName,
  situation,
  analysis
}: {
  firstName: string;
  situation: string;
  analysis: AnalysisResult;
}) {
  return `
    <div style="background:#f6efe7;padding:32px;font-family:Inter,Arial,sans-serif;color:#2c211b;line-height:1.6;">
      <div style="max-width:680px;margin:0 auto;background:rgba(255,248,240,0.92);border:1px solid rgba(90,60,40,0.12);border-radius:28px;box-shadow:0 18px 45px rgba(60,35,20,0.10);overflow:hidden;">
        <div style="padding:32px 32px 12px;">
          <p style="margin:0 0 10px;color:#8e4b32;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">Miroir d’Intuition</p>
          <h1 style="margin:0 0 12px;font-size:30px;line-height:1.15;color:#1e1612;">Bonjour ${escapeHtml(firstName)},</h1>
          <p style="margin:0;color:#6f5a4f;">Voici votre éclairage complet, préparé à partir de ce que vous avez partagé.</p>
        </div>
        <div style="padding:20px 32px 32px;display:grid;gap:18px;">
          <section style="padding:20px;border-radius:22px;background:#fffaf4;border:1px solid rgba(90,60,40,0.12);">
            <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#8e4b32;">Votre situation</p>
            <p style="margin:0;color:#3a2a22;">${escapeHtml(situation)}</p>
          </section>
          ${[
            ['Ce que vous semblez traverser', analysis.summary],
            ['Ce qui relève peut-être de la peur ou de la surcharge mentale', analysis.fear],
            ['Ce que votre intuition essaie peut-être de vous montrer', analysis.intuition],
            ['La piste douce à explorer maintenant', analysis.nextStep]
          ]
            .map(
              ([title, text]) => `
                <section style="padding:20px;border-radius:22px;background:rgba(255,250,244,0.92);border:1px solid rgba(90,60,40,0.12);">
                  <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#8e4b32;">${title}</p>
                  <p style="margin:0;color:#3a2a22;">${escapeHtml(text)}</p>
                </section>
              `
            )
            .join('')}
          <p style="margin:6px 0 0;color:#6f5a4f;">Avec douceur,<br />Cabinet Astrae</p>
        </div>
      </div>
    </div>
  `;
}
