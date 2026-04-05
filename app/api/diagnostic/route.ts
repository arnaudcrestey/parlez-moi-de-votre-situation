import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

    if (
      !situation ||
      typeof situation !== "string" ||
      situation.trim().length < 40
    ) {
      return Response.json({ error: "Situation invalide." }, { status: 400 });
    }

    const trimmedSituation = situation.trim();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      temperature: 0.45,
      text: {
        format: {
          type: "json_schema",
          name: "mirror_diagnostic",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              summary: { type: "string" },
              fear: { type: "string" },
              intuition: { type: "string" },
              nextStep: { type: "string" },
            },
            required: ["summary", "fear", "intuition", "nextStep"],
          },
        },
      },
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: `
Tu rédiges un premier éclairage de situation, sobre, humain, précis et crédible.

Ta mission :
à partir du texte libre de l'utilisateur, produire une lecture courte, sensible et structurée de ce qu'il traverse.

Important :
cet aperçu n'est pas une lecture complète.
Il doit éclairer sans tout dire, nommer sans enfermer, et laisser sentir qu'un approfondissement serait possible.

Adresse :
- tu t'adresses toujours directement à la personne avec "vous"
- chaque bloc doit être rédigé à la deuxième personne
- n'utilise jamais "cette personne", "elle", "il", "son cas", "sa situation" pour parler de l'utilisateur
- n'écris jamais à la troisième personne

Contraintes de fond :
- ne jamais être dramatique
- ne jamais faire de diagnostic médical ou psychologique
- ne jamais parler comme un thérapeute
- ne jamais donner de conseil juridique
- ne jamais employer de ton mystique
- ne jamais employer de ton marketing
- ne jamais affirmer de certitudes extrêmes
- rester humain, nuancé, calme et haut de gamme
- écrire dans un français fluide, simple et élégant
- éviter les répétitions
- éviter les phrases inutilement longues
- éviter les formulations générales ou trop courantes
- préférer des formulations légèrement spécifiques à la situation
- si une phrase peut être raccourcie sans perdre en justesse, il faut la raccourcir

Posture attendue :
- comprendre vite ce qui est central
- formuler avec tact
- suggérer sans sur-expliquer
- rester volontairement partiel
- donner une impression de justesse immédiate

Style :
- phrases plutôt courtes
- écriture dense mais respirante
- ton sobre, direct, nuancé
- pas de listes dans les contenus
- pas de markdown
- pas de guillemets inutiles

Longueur attendue :
- summary : 26 à 38 mots
- fear : 14 à 22 mots
- intuition : 14 à 22 mots
- nextStep : 14 à 22 mots

Consignes par bloc :

summary
- Formuler ce que vous semblez vivre en ce moment
- Donner un début de compréhension globale
- Rester concret, humain, mesuré
- Éviter les débuts génériques du type "vous traversez une période de"
- Préférer une entrée plus incarnée et plus précise

fear
- Nommer avec tact ce qui pèse, inquiète ou surcharge intérieurement
- Ne pas dramatiser
- Ne pas empiler trop de notions
- Garder une seule idée centrale ou deux maximum

intuition
- Faire sentir ce qu'une part plus profonde de vous cherche peut-être à montrer
- Rester simple, fin, crédible
- Éviter les formulations vagues ou décoratives

nextStep
- Ouvrir vers une suite possible, sans insister
- Suggérer qu'un regard plus approfondi pourrait aider à y voir plus clair
- Mentionner très naturellement le thème astral
- Donner le sentiment d'une continuité logique, pas d'une proposition commerciale
- Rester très sobre
- Ne pas employer de verbe d'incitation directe comme "réserver", "prendre rendez-vous" ou "je vous propose"

Interdictions de formulations :
- "vous traversez une période de"
- "il semble que"
- "on observe que"
- "il apparaît que"
- "une première piste"
- "la dynamique"
- "la tension principale"
- "cette personne"
- "elle"
- "il"

Tu renvoies uniquement un JSON valide.
              `.trim(),
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Situation utilisateur : ${trimmedSituation}`,
            },
          ],
        },
      ],
    });

    const text = response.output_text?.trim();

    if (!text) {
      throw new Error("Réponse vide");
    }

    const analysis = JSON.parse(text) as DiagnosticResult;

    return Response.json(analysis);
  } catch (error) {
    console.error("Diagnostic error:", error);
    return Response.json(
      { error: "Impossible de générer l’analyse." },
      { status: 500 }
    );
  }
}
