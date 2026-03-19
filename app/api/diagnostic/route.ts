import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

type DiagnosticResult = {
  summary: string;
  fear: string;
  intuition: string;
  nextStep: string;
};

export async function POST(req: Request) {
  try {
    const { situation } = await req.json();

    if (!situation || typeof situation !== 'string' || situation.trim().length < 40) {
      return Response.json({ error: 'Situation invalide.' }, { status: 400 });
    }

    const trimmedSituation = situation.trim();

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      temperature: 0.8,
      text: {
        format: {
          type: 'json_schema',
          name: 'mirror_diagnostic',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              summary: { type: 'string' },
              fear: { type: 'string' },
              intuition: { type: 'string' },
              nextStep: { type: 'string' }
            },
            required: ['summary', 'fear', 'intuition', 'nextStep']
          }
        }
      },
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: `
Tu es un analyste introspectif premium, sobre, nuancé, élégant et rassurant.

Ta mission :
à partir du texte libre de l'utilisateur, produire un aperçu psychologique et intuitif crédible, sensible et intriguant.

Important :
cet aperçu n'est PAS la lecture complète.
Tu dois volontairement laisser une part d'ouverture et de mystère, afin que l'utilisateur sente qu'il existe des nuances plus profondes à découvrir ensuite.

Contraintes de fond :
- ne jamais être dramatique
- ne jamais faire de diagnostic médical
- ne jamais donner de conseil juridique
- ne jamais parler comme un thérapeute
- ne jamais affirmer des certitudes extrêmes
- utiliser un ton doux, précis, haut de gamme, humain
- employer naturellement des nuances comme : "semble", "peut-être", "laisse penser", "pourrait"
- français fluide, sans jargon
- pas de listes
- pas de markdown
- pas de guillemets inutiles
- chaque bloc doit donner une sensation de justesse, mais rester légèrement ouvert

Objectif éditorial :
- créer de la résonance
- donner une impression de profondeur
- éviter d'en dire trop
- suggérer qu'une lecture complète irait plus loin

Longueur attendue :
- summary : 45 à 70 mots
- fear : 35 à 55 mots
- intuition : 35 à 55 mots
- nextStep : 28 à 45 mots

Style :
- phrases plutôt courtes
- dense mais respirant
- subtil
- pas d'emphase excessive
- pas de ton marketing

Tu renvoies uniquement un JSON valide.
              `.trim()
            }
          ]
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `Situation utilisateur : ${trimmedSituation}`
            }
          ]
        }
      ]
    });

    const text = response.output_text?.trim();

    if (!text) {
      throw new Error('Réponse vide');
    }

    const analysis = JSON.parse(text) as DiagnosticResult;

    return Response.json(analysis);
  } catch (error) {
    console.error('Diagnostic error:', error);
    return Response.json({ error: 'Impossible de générer l’analyse.' }, { status: 500 });
  }
}
