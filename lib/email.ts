import type { AnalysisResult } from '@/lib/mirror-analysis';

type BuildLeadEmailParams = {
  firstName: string;
  email?: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  birthHour?: string;
  birthMinute?: string;
  birthCity?: string;
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
  email = '',
  birthDay = '',
  birthMonth = '',
  birthYear = '',
  birthHour = '',
  birthMinute = '',
  birthCity = '',
  situation,
  analysis
}: BuildLeadEmailParams) {
  const birthDate =
    birthDay || birthMonth || birthYear
      ? `${escapeHtml(birthDay)}/${escapeHtml(birthMonth)}/${escapeHtml(birthYear)}`
      : 'Non renseignée';

  const birthTime =
    birthHour || birthMinute
      ? `${escapeHtml(birthHour || '--')}:${escapeHtml(birthMinute || '--')}`
      : 'Non renseignée';

  return `
    <div style="margin:0;padding:0;background:#f6f6f6;font-family:Arial,Helvetica,sans-serif;color:#1f1f1f;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;padding:28px 24px;">
        <h1 style="margin:0 0 10px;font-size:18px;line-height:1.3;font-weight:700;color:#111111;">
          Nouveau lead Miroir d’Intuition
        </h1>

        <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#444444;">
          Un utilisateur vient de compléter son parcours.
        </p>

        <hr style="border:none;border-top:1px solid #e7e7e7;margin:18px 0;" />

        <h2 style="margin:0 0 14px;font-size:16px;line-height:1.3;font-weight:700;color:#111111;">
          👤 Informations
        </h2>

        <p style="margin:0 0 8px;font-size:14px;line-height:1.6;">
          <strong>Prénom :</strong> ${escapeHtml(firstName)}
        </p>

        <p style="margin:0 0 8px;font-size:14px;line-height:1.6;">
          <strong>Email :</strong> <a href="mailto:${escapeHtml(email)}" style="color:#1a73e8;text-decoration:none;">${escapeHtml(email)}</a>
        </p>

        <p style="margin:0 0 8px;font-size:14px;line-height:1.6;">
          <strong>Date de naissance :</strong> ${birthDate}
        </p>

        <p style="margin:0 0 8px;font-size:14px;line-height:1.6;">
          <strong>Heure de naissance :</strong> ${birthTime}
        </p>

        <p style="margin:0 0 8px;font-size:14px;line-height:1.6;">
          <strong>Ville de naissance :</strong> ${escapeHtml(birthCity || 'Non renseignée')}
        </p>

        <hr style="border:none;border-top:1px solid #e7e7e7;margin:18px 0;" />

        <h2 style="margin:0 0 14px;font-size:16px;line-height:1.3;font-weight:700;color:#111111;">
          📝 Situation
        </h2>

        <p style="margin:0 0 6px;font-size:14px;line-height:1.7;color:#222222;">
          ${escapeHtml(situation).replaceAll('\n', '<br />')}
        </p>

        <hr style="border:none;border-top:1px solid #e7e7e7;margin:18px 0;" />

        <h2 style="margin:0 0 14px;font-size:16px;line-height:1.3;font-weight:700;color:#111111;">
          📖 Début d’éclairage
        </h2>

        <div style="margin:0 0 14px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#8f5b3f;">
            01 · Ce que vous semblez traverser
          </p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#222222;">
            ${escapeHtml(analysis.summary)}
          </p>
        </div>

        <div style="margin:0 0 14px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#8f5b3f;">
            02 · Peur ou surcharge mentale
          </p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#222222;">
            ${escapeHtml(analysis.fear)}
          </p>
        </div>

        <div style="margin:0 0 14px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#8f5b3f;">
            03 · Ce que votre intuition montre
          </p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#222222;">
            ${escapeHtml(analysis.intuition)}
          </p>
        </div>

        <div style="margin:0 0 18px;">
          <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#8f5b3f;">
            04 · Piste douce à explorer
          </p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#222222;">
            ${escapeHtml(analysis.nextStep)}
          </p>
        </div>

        <a
          href="mailto:${escapeHtml(email)}"
          style="display:inline-block;background:#2ec7e6;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-size:14px;font-weight:700;"
        >
          Contacter ce lead
        </a>
      </div>
    </div>
  `;
}
