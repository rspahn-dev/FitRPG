'use server';

import { generatePersonalizedWorkoutPlan } from '@/ai/flows/generate-personalized-workout-plan';
import { z } from 'zod';

const formSchema = z.object({
  fitnessGoals: z.string(),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  pastWorkoutHistory: z.string(),
  workoutPreferences: z.string().optional(),
});

type State = {
  workoutPlan: string;
  error: string;
};

export async function generateWorkoutPlanAction(
  prevState: State,
  formData: FormData
): Promise<State> {
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
