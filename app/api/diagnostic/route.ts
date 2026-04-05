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

const SENSITIVE_PATTERNS = [
  "suicide",
  "suicidaire",
  "me tuer",
  "mettre fin à mes jours",
  "envie de mourir",
  "je veux mourir",
  "je vais mourir",
  "plus envie de vivre",
  "auto mutilation",
  "automutilation",
  "je vais craquer",
];

function normalizeText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
}

function clampSentence(value: string, maxLength: number): string {
  const cleaned = normalizeText(value);
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.slice(0, maxLength).trim().replace(/[,:;.\-–—\s]+$/, "") + ".";
}

function sanitizeAnalysis(raw: Partial<DiagnosticResult>): DiagnosticResult {
  return {
    summary: clampSentence(
      normalizeText(raw.summary) ||
        "Quelque chose en vous semble perdre ses repères, comme si tout devenait plus lourd à porter et plus difficile à relier.",
      320
    ),
    fear: clampSentence(
      normalizeText(raw.fear) ||
        "La peur de ne plus savoir où vous appuyer prend peut-être beaucoup de place en ce moment.",
      220
    ),
    intuition: clampSentence(
      normalizeText(raw.intuition) ||
        "Une part de vous cherche peut-être moins une réponse immédiate qu’un point d’appui plus juste.",
      220
    ),
    nextStep: clampSentence(
      normalizeText(raw.nextStep) ||
        "Un éclairage plus approfondi pourrait vous aider à remettre un peu d’ordre et de lisibilité dans ce que vous vivez.",
      240
    ),
  };
}

function containsSensitiveSignal(text: string): boolean {
  const lower = text.toLowerCase();
  return SENSITIVE_PATTERNS.some((pattern) => lower.includes(pattern));
}

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

    if (containsSensitiveSignal(trimmedSituation)) {
      return Response.json(
        {
          error:
            "Cette situation semble demander un soutien humain direct. Si vous vous sentez en danger ou au bord de craquer, contactez immédiatement une personne de confiance ou un service d’urgence près de chez vous.",
        },
        { status: 422 }
      );
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      temperature: 0.4,
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

Finalité :
À partir du texte libre de l'utilisateur, produire une lecture courte, sensible et structurée de ce qu'il vit maintenant.
Ce texte n'est pas une analyse complète. Il doit éclairer sans enfermer, nommer sans dramatiser, et laisser sentir qu'un approfondissement reste possible.

Adresse :
- tu t'adresses toujours directement à la personne avec "vous"
- chaque bloc est rédigé à la deuxième personne
- n'utilise jamais la troisième personne pour parler de l'utilisateur
- n'écris jamais "cette personne", "elle", "il", "son cas", "sa situation"

Contraintes de fond :
- ne jamais être dramatique
- ne jamais faire de diagnostic médical, psychiatrique ou psychologique
- ne jamais parler comme un thérapeute
- ne jamais donner de conseil juridique
- ne jamais employer de ton mystique
- ne jamais employer de ton marketing
- ne jamais affirmer de certitudes absolues
- rester nuancé, calme, humain, haut de gamme
- écrire dans un français simple, fluide et élégant
- éviter les répétitions
- éviter les phrases trop longues
- éviter les formulations générales ou mécaniques
- préférer des formulations légèrement ancrées dans ce qui a été confié
- si une phrase peut être raccourcie sans perdre en justesse, il faut la raccourcir

Posture attendue :
- comprendre vite ce qui est central
- faire sentir un vrai niveau d'écoute
- formuler avec tact
- suggérer sans sur-expliquer
- rester volontairement partiel
- donner une impression de justesse immédiate

Style :
- phrases plutôt courtes
- ton sobre, direct, nuancé
- écriture dense mais respirante
- pas de listes dans les contenus
- pas de markdown
- pas de guillemets inutiles

Longueur attendue :
- summary : 26 à 38 mots
- fear : 14 à 22 mots
- intuition : 14 à 22 mots
- nextStep : 14 à 24 mots

Consignes par bloc :

summary
- formuler ce que vous semblez vivre maintenant
- faire émerger un début de compréhension globale
- relier au maximum deux éléments concrets de la situation
- ne pas reformuler platement toute la demande
- éviter les entrées génériques
- éviter "vous traversez une période de"

fear
- nommer avec tact ce qui pèse, inquiète ou surcharge intérieurement
- garder une seule idée centrale, ou deux maximum
- ne pas dramatiser
- ne pas accumuler les notions

intuition
- faire sentir ce qu'une part plus profonde de vous cherche peut-être à montrer
- rester simple, fin et crédible
- éviter les phrases décoratives ou trop abstraites

nextStep
- ouvrir vers une suite possible, sans insister
- suggérer qu'un regard plus approfondi pourrait aider à y voir plus clair
- la mention du thème astral est autorisée seulement si elle s'intègre naturellement à la situation
- ne pas mentionner systématiquement le thème astral
- donner le sentiment d'une continuité logique, pas d'une proposition commerciale
- ne jamais employer "réserver", "prendre rendez-vous", "je vous propose"

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

Important :
Si la situation évoque une détresse très lourde, garde un ton encore plus sobre, plus retenu, plus humain.
N'ajoute jamais de spectaculaire.
Ne donne jamais l'impression de traiter la souffrance comme un prétexte narratif.

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

    if (!response.output_text) {
      console.error("OpenAI response without output_text:", response);
      throw new Error("Réponse vide");
    }

    let parsed: Partial<DiagnosticResult>;

    try {
      parsed = JSON.parse(response.output_text) as Partial<DiagnosticResult>;
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw output:", response.output_text);
      throw new Error("Réponse JSON invalide");
    }

    const analysis = sanitizeAnalysis(parsed);

    return Response.json(analysis);
  } catch (error) {
    console.error("Diagnostic error:", error);
    return Response.json(
      { error: "Impossible de générer l’analyse." },
      { status: 500 }
    );
  }
}
