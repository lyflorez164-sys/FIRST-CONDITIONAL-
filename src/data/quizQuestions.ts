import { QuizQuestion } from '../types';
import { ZERO_CONDITIONAL_SENTENCES, FIRST_CONDITIONAL_SENTENCES } from './conditionalsData';

// Generate official 20 questions based exactly on prompt answer key (all True)
export const OFFICIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  ...ZERO_CONDITIONAL_SENTENCES.map((item, index) => ({
    id: `q-z-${index + 1}`,
    sentenceId: item.id,
    sentence: item.fullSentence,
    type: item.type,
    promptQuestion: `Is this statement grammatically and conceptually True as a Zero Conditional?`,
    correctAnswer: true,
    explanation: `TRUE. ${item.explanation}`,
    isOfficialPromptItem: true,
    tenseFormula: 'If + Present Simple, ... Present Simple',
  })),
  ...FIRST_CONDITIONAL_SENTENCES.map((item, index) => ({
    id: `q-f-${index + 1}`,
    sentenceId: item.id,
    sentence: item.fullSentence,
    type: item.type,
    promptQuestion: `Is this statement grammatically and logically True as a First Conditional?`,
    correctAnswer: true,
    explanation: `TRUE. ${item.explanation}`,
    isOfficialPromptItem: true,
    tenseFormula: 'If + Present Simple, ... will + Base Verb',
  })),
];

// Additional distractor challenge questions for deeper mastery
export const DISTRACTOR_CHALLENGE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-d-1',
    sentenceId: 'd-1',
    sentence: 'If you will heat water to 100 degrees Celsius, it will boil.',
    type: 'zero',
    promptQuestion: 'Is this sentence grammatically correct for a scientific fact?',
    correctAnswer: false,
    explanation: 'FALSE. In Zero Conditional, never use "will" in either the if-clause or the result clause. The correct form is: "If you heat water to 100 degrees Celsius, it boils."',
    isOfficialPromptItem: false,
    tenseFormula: 'Incorrect: "will heat" should be Present Simple "heat"',
  },
  {
    id: 'q-d-2',
    sentenceId: 'd-2',
    sentence: 'If students will study hard, they pass the exam tomorrow.',
    type: 'first',
    promptQuestion: 'Is this sentence grammatically correct for a First Conditional prediction?',
    correctAnswer: false,
    explanation: 'FALSE. In First Conditional, the "if" clause takes the Present Simple (study), NOT "will study". The result clause takes "will pass".',
    isOfficialPromptItem: false,
    tenseFormula: 'Incorrect: "will study" is wrong inside the if-clause',
  },
  {
    id: 'q-d-3',
    sentenceId: 'd-3',
    sentence: 'If you mix red and blue, you will get purple every time.',
    type: 'zero',
    promptQuestion: 'Is "will get" appropriate for a universal, immutable scientific law?',
    correctAnswer: false,
    explanation: 'FALSE. For invariable physical and color rules, English uses the Zero Conditional with Present Simple in both clauses: "you get purple."',
    isOfficialPromptItem: false,
    tenseFormula: 'Incorrect: universal facts use Present Simple "get"',
  },
  {
    id: 'q-d-4',
    sentenceId: 'd-4',
    sentence: 'If a student is absent, they missed important information yesterday.',
    type: 'zero',
    promptQuestion: 'Is mixing Present Simple with Past Simple valid for a routine conditional rule?',
    correctAnswer: false,
    explanation: 'FALSE. Zero Conditional describes timeless classroom consequences using Present Simple in both clauses: "they miss important information."',
    isOfficialPromptItem: false,
    tenseFormula: 'Incorrect: "missed" shifts to past tense',
  },
  {
    id: 'q-d-5',
    sentenceId: 'd-5',
    sentence: 'If the weather is good tomorrow, we had the class outside.',
    type: 'first',
    promptQuestion: 'Can a future condition "tomorrow" pair with past tense "had"?',
    correctAnswer: false,
    explanation: 'FALSE. When describing a planned future event dependent on tomorrow’s weather, use "will have": "we will have the class outside."',
    isOfficialPromptItem: false,
    tenseFormula: 'Incorrect: past tense "had" cannot predict future events',
  },
];
