'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating personalized workout plans based on user input.
 *
 * It includes:
 * - generatePersonalizedWorkoutPlan: An exported function to trigger the flow.
 * - GeneratePersonalizedWorkoutPlanInput: The input type for the flow.
 * - GeneratePersonalizedWorkoutPlanOutput: The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedWorkoutPlanInputSchema = z.object({
  fitnessGoals: z
    .string()
    .describe('The user\u0027s fitness goals (e.g., lose weight, build muscle, improve endurance).'),
  fitnessLevel: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .describe('The user\u0027s current fitness level.'),
  pastWorkoutHistory: z
    .string()
    .describe('A summary of the user\u0027s past workout history.'),
  workoutPreferences: z
    .string()
    .optional()
    .describe('Any specific workout preferences or limitations the user has (e.g., prefers running, avoids weightlifting).'),
});
export type GeneratePersonalizedWorkoutPlanInput = z.infer<typeof GeneratePersonalizedWorkoutPlanInputSchema>;

const GeneratePersonalizedWorkoutPlanOutputSchema = z.object({
  workoutPlan: z
    .string()
    .describe('A personalized workout plan based on the user\u0027s input.'),
});
export type GeneratePersonalizedWorkoutPlanOutput = z.infer<typeof GeneratePersonalizedWorkoutPlanOutputSchema>;

export async function generatePersonalizedWorkoutPlan(
  input: GeneratePersonalizedWorkoutPlanInput
): Promise<GeneratePersonalizedWorkoutPlanOutput> {
  return generatePersonalizedWorkoutPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedWorkoutPlanPrompt',
  input: {schema: GeneratePersonalizedWorkoutPlanInputSchema},
  output: {schema: GeneratePersonalizedWorkoutPlanOutputSchema},
  prompt: `You are an expert personal trainer. Generate a personalized workout plan based on the user's fitness goals, current fitness level, and past workout history. Be encouraging and motivating.

Fitness Goals: {{{fitnessGoals}}}
Fitness Level: {{{fitnessLevel}}}
Past Workout History: {{{pastWorkoutHistory}}}
Workout Preferences: {{{workoutPreferences}}}

Workout Plan:`,
});

const generatePersonalizedWorkoutPlanFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedWorkoutPlanFlow',
    inputSchema: GeneratePersonalizedWorkoutPlanInputSchema,
    outputSchema: GeneratePersonalizedWorkoutPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
