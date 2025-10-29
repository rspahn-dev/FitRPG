import { config } from 'dotenv';
config();

import { generatePersonalizedWorkoutPlanFlow } from '@/ai/flows/generate-personalized-workout-plan';
import { generateCreatureSuggestionFlow } from '@/ai/flows/generate-creature-suggestion';

export default {
  'generate-personalized-workout-plan': generatePersonalizedWorkoutPlanFlow,
  'generate-creature-suggestion': generateCreatureSuggestionFlow,
};
