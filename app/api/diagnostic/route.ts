import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { situation } = await req.json();

    if (!situation || typeof situation !== 'string' || situation.trim().length < 40) {
      return Response.json(
        { error: 'Situation invalide.' },
        { status: 400 }
      );
    }

    const prompt = `
Tu es un analyste introspectif haut de gamme, sobre, nuancé, bienveillant et structuré.

Ta mission :
à partir du texte libre de l'utilisateur, produire une lecture psychologique et intuitive douce, crédible et élégante.

Contraintes :
- ne jamais être dramatique
- ne jamais faire de diagnostic médical
- ne jamais donner de conseil juridique ou thérapeutique
- ne jamais affirmer des choses extrêmes comme des certitudes
- employer souvent : "semble", "peut-être", "laisse penser", "pourrait"
- ton premium, humain, apaisant, lucide
- français naturel, sans jargon
- phrases assez courtes
- pas de listes
- pas de markdown

Tu dois renvoyer UNIQUEMENT un JSON valide avec exactement ces 4 clés :
{
  "summary": "...",
  "fear": "...",
  "intuition": "...",
  "nextStep": "..."
}

Longueur attendue :
- summary : 90 à 140 mots
- fear : 70 à 120 mots
- intuition : 70 à 120 mots
- nextStep : 60 à 100 mots
`;

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: prompt
        },
        {
          role: 'user',
          content: `Situation utilisateur : ${situation}`
        }
      ]
    });

    const text = response.output_text?.trim();

    if (!text) {
      throw new Error('Réponse vide');
    }

    const analysis = JSON.parse(text);

    return Response.json(analysis);
  } catch (error) {
    console.error('Diagnostic error:', error);
    return Response.json(
      { error: 'Impossible de générer l’analyse.' },
      { status: 500 }
    );
  }
}
