/**
 * @fileOverview This file defines a Genkit flow for generating a creature suggestion.
 *
 * It includes:
 * - generateCreatureSuggestion: An exported function to trigger the flow.
 * - GenerateCreatureSuggestionOutput: The output type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCreatureSuggestionOutputSchema = z.object({
  creatureName: z.string().describe('A creative and cool name for a new creature.'),
  creatureType: z.string().describe('A creative and cool type for a new creature (e.g. "Electric Squirrel", "Rock Golem").'),
  fitnessGoals: z.string().describe('A simple, motivating fitness goal for a beginner, written in the first person. Should be 1-2 sentences.'),
});
export type GenerateCreatureSuggestionOutput = z.infer<typeof GenerateCreatureSuggestionOutputSchema>;


export async function generateCreatureSuggestion(): Promise<GenerateCreatureSuggestionOutput> {
  return generateCreatureSuggestionFlow();
}

const prompt = ai.definePrompt({
  name: 'generateCreatureSuggestionPrompt',
  output: { schema: GenerateCreatureSuggestionOutputSchema },
  prompt: `You are a creative assistant for a fitness RPG game called FitRPG. Your task is to generate a single, compelling suggestion for a new player's first creature and fitness goal.

  Generate a creative creature name, a creative creature type, and write a simple, inspiring fitness goal for a beginner. The goal should be about starting a new fitness journey and written in the first person.`,
});


export const generateCreatureSuggestionFlow = ai.defineFlow(
  {
    name: 'generateCreatureSuggestionFlow',
    outputSchema: GenerateCreatureSuggestionOutputSchema,
  },
  async () => {
    const { output } = await prompt();
    return output!;
  }
);
