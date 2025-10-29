
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ReactMarkdown from 'react-markdown';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { GeneratePersonalizedWorkoutPlanOutput } from '@/ai/flows/generate-personalized-workout-plan';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  fitnessGoals: z.string().min(10, {
    message: 'Please describe your fitness goals in at least 10 characters.',
  }),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  pastWorkoutHistory: z.string().min(10, {
    message: 'Please describe your past workouts in at least 10 characters.',
  }),
  workoutPreferences: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AiTrainerForm() {
  const [workoutPlan, setWorkoutPlan] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fitnessGoals: '',
      fitnessLevel: 'intermediate',
      pastWorkoutHistory: '',
      workoutPreferences: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError('');
    setWorkoutPlan('');

    try {
      const response = await fetch('/api/genkit/generatePersonalizedWorkoutPlanFlow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: GeneratePersonalizedWorkoutPlanOutput = await response.json();
      setWorkoutPlan(result.workoutPlan);
    } catch (err) {
      console.error('Error generating workout plan:', err);
      setError('Failed to generate workout plan. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="fitnessGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitness Goals</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Lose 10 pounds, build muscle for my arms, run a 5k."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What do you want to achieve?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fitnessLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitness Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  name={field.name}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your current fitness level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pastWorkoutHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Past Workout History</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., I go to the gym 3 times a week, mostly doing weightlifting. I used to run but stopped."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What have you been doing recently?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workoutPreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferences or Limitations (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., I prefer outdoor activities, I have a knee injury, I don't have access to a gym."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Anything else the sage should know?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Generate Plan
          </Button>
        </form>
      </Form>

      {isSubmitting && (
        <Card>
          <CardHeader>
            <CardTitle>Generating your plan...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
              </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">An Error Occurred</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {workoutPlan && !isSubmitting && (
        <Card className="bg-primary/5">
          <CardHeader>
            <CardTitle>Your Personalized Workout Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <article className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>{workoutPlan}</ReactMarkdown>
            </article>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
