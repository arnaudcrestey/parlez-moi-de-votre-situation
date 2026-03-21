import type { AnalysisResult } from '@/lib/mirror-analysis';

type BuildLeadEmailParams = {
  firstName: string;
  situation: string;
  analysis: AnalysisResult;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export function buildLeadEmail({
  firstName,
  situation,
  analysis
}: BuildLeadEmailParams) {
  return `
    <div style="margin:0;padding:0;background:#f6f6f6;font-family:Arial,Helvetica,sans-serif;color:#1f1f1f;">
      <div style="max-width:760px;margin:0 auto;background:#ffffff;padding:32px 28px;">
        <h1 style="margin:0 0 10px;font-size:34px;line-height:1.2;font-weight:700;color:#111111;">
          Nouveau lead Miroir d’Intuition
        </h1>

        <p style="margin:0 0 26px;font-size:18px;line-height:1.6;color:#333333;">
          Un utilisateur vient de compléter son parcours.
        </p>

        <hr style="border:none;border-top:1px solid #e7e7e7;margin:24px 0;" />

        <h2 style="margin:0 0 18px;font-size:28px;line-height:1.3;font-weight:700;color:#111111;">
          👤 Informations
        </h2>

        <p style="margin:0 0 12px;font-size:22px;line-height:1.6;">
          <strong>Prénom :</strong> ${escapeHtml(firstName)}
        </p>

        <hr style="border:none;border-top:1px solid #e7e7e7;margin:24px 0;" />

        <h2 style="margin:0 0 18px;font-size:28px;line-height:1.3;font-weight:700;color:#111111;">
          📝 Situation
        </h2>

        <p style="margin:0 0 8px;font-size:22px;line-height:1.75;color:#222222;">
          ${escapeHtml(situation).replaceAll('\n', '<br />')}
        </p>

        <hr style="border:none;border-top:1px solid #e7e7e7;margin:24px 0;" />

        <h2 style="margin:0 0 18px;font-size:28px;line-height:1.3;font-weight:700;color:#111111;">
          📖 Début d’éclairage
        </h2>

        <div style="margin:0 0 22px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8f5b3f;">
            01 · Ce que vous semblez traverser
          </p>
          <p style="margin:0;font-size:20px;line-height:1.75;color:#222222;">
            ${escapeHtml(analysis.summary)}
          </p>
        </div>

        <div style="margin:0 0 22px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8f5b3f;">
            02 · Ce qui relève peut-être de la peur ou de la surcharge mentale
          </p>
          <p style="margin:0;font-size:20px;line-height:1.75;color:#222222;">
            ${escapeHtml(analysis.fear)}
          </p>
        </div>

        <div style="margin:0 0 22px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8f5b3f;">
            03 · Ce que votre intuition essaie peut-être de vous montrer
          </p>
          <p style="margin:0;font-size:20px;line-height:1.75;color:#222222;">
            ${escapeHtml(analysis.intuition)}
          </p>
        </div>

        <div style="margin:0 0 10px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#8f5b3f;">
            04 · La piste douce à explorer maintenant
          </p>
          <p style="margin:0;font-size:20px;line-height:1.75;color:#222222;">
            ${escapeHtml(analysis.nextStep)}
          </p>
        </div>
      </div>
    </div>
  `;
}
