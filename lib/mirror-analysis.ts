export type AnalysisResult = {
  summary: string;
  fear: string;
  intuition: string;
  nextStep: string;
};

const normalize = (value: string) =>
  value
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 560);

const snippets = {
  transition:
    'Vous semblez être à la lisière d’un passage important, avec la sensation qu’un rythme intérieur cherche à évoluer sans que tout soit encore nommé.',
  tension:
    'Votre récit laisse sentir une tension entre le besoin de rester dans un cadre connu et l’élan plus discret d’aller vers quelque chose de plus juste pour vous.',
  fatigue:
    'On perçoit aussi une fatigue mentale liée au fait de porter trop d’hypothèses à la fois, comme si chaque option devait être validée avant d’être ressentie.',
  sensitivity:
    'Sous cette hésitation, il y a pourtant une sensibilité fine à ce qui vous nourrit réellement et à ce qui commence à ne plus vous correspondre.'
};

export function buildMockAnalysis(situation: string): AnalysisResult {
  const cleaned = normalize(situation);
  const lengthNote = cleaned.length > 220 ? snippets.transition : snippets.tension;

  return {
    summary: `${lengthNote} À travers vos mots, on sent surtout une recherche de cohérence entre ce que vous ressentez en profondeur et ce que votre quotidien vous demande encore de tenir.`,
    fear: `${snippets.fatigue} La peur semble peut-être prendre la forme d’un besoin de certitude immédiate, ou d’une inquiétude à l’idée de décevoir, de perdre un équilibre ou de vous tromper.`,
    intuition: `${snippets.sensitivity} Votre intuition essaie peut-être moins de vous donner une réponse brutale que de vous montrer une direction intérieure, plus paisible, plus alignée, qui mérite d’être écoutée sans précipitation.`,
    nextStep: `Pour maintenant, la piste la plus douce serait de revenir à ce qui allège légèrement votre corps ou votre esprit lorsque vous y pensez. Notez ce qui, dans votre situation, crée de l’ouverture plutôt que de la contraction, puis laissez cette sensation devenir un premier repère concret.`
  };
}

export async function generateAnalysis(situation: string): Promise<AnalysisResult> {
  // Future OpenAI integration can be added here while keeping the API contract stable.
  return buildMockAnalysis(situation);
}
