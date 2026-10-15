export type ConditionalType = 'zero' | 'first';

export interface ConditionalSentence {
  id: string;
  type: ConditionalType;
  fullSentence: string;
  conditionClause: string; // e.g. "If you heat water to 100 degrees Celsius,"
  resultClause: string;    // e.g. "it boils."
  invertedSentence: string; // e.g. "Water boils if you heat it to 100 degrees Celsius."
  conditionVerb: string;
  conditionTense: string; // e.g. "Present Simple"
  resultVerb: string;
  resultTense: string;    // e.g. "Present Simple" or "will + Base Verb"
  educationalTopic: string;
  explanation: string;
  isTrueInKey: boolean; // From user's Answer Key: True
}

export interface QuizQuestion {
  id: string;
  sentenceId: string;
  sentence: string;
  type: ConditionalType;
  promptQuestion: string;
  correctAnswer: boolean;
  explanation: string;
  isOfficialPromptItem: boolean;
  tenseFormula: string;
}

export interface MatchingPair {
  id: string;
  type: ConditionalType;
  condition: string;
  result: string;
  fullSentence: string;
  topic: string;
}

export interface VerbLabQuestion {
  id: string;
  type: ConditionalType;
  sentenceTemplate: string; // "If students [blank1] regularly, they [blank2] the material better."
  blank1Options: string[];
  blank1Correct: string;
  blank2Options: string[];
  blank2Correct: string;
  fullSentence: string;
  ruleExplanation: string;
}
