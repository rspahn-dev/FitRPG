'use server';

import { generatePersonalizedWorkoutPlan } from '@/ai/flows/generate-personalized-workout-plan';
import { generateCreatureSuggestion } from '@/ai/flows/generate-creature-suggestion';
import { z } from 'zod';

const formSchema = z.object({
  fitnessGoals: z.string(),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  pastWorkoutHistory: z.string(),
  workoutPreferences: z.string().optional(),
});

type WorkoutPlanState = {
  workoutPlan: string;
  error: string;
};

export async function generateWorkoutPlanAction(
  prevState: WorkoutPlanState,
  formData: FormData
): Promise<WorkoutPlanState> {
  try {
    const parsedData = formSchema.safeParse({
      fitnessGoals: formData.get('fitnessGoals'),
      fitnessLevel: formData.get('fitnessLevel'),
      pastWorkoutHistory: formData.get('pastWorkoutHistory'),
      workoutPreferences: formData.get('workoutPreferences'),
    });

    if (!parsedData.success) {
      return {
        ...prevState,
        error: 'Invalid form data. Please check your inputs.',
      };
    }

    const result = await generatePersonalizedWorkoutPlan(parsedData.data);
    
    return {
      workoutPlan: result.workoutPlan,
      error: '',
    };
  } catch (error) {
    console.error('Error generating workout plan:', error);
    return {
      ...prevState,
      error: 'Failed to generate workout plan. Please try again later.',
    };
  }
}


export async function generateCreatureSuggestionAction() {
  try {
    const suggestion = await generateCreatureSuggestion();
    return suggestion;
  } catch (error) {
    console.error('Error generating creature suggestion:', error);
    // Return null or throw a more specific error to be handled by the client
    return null;
  }
}
