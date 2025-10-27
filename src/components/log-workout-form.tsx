'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Dumbbell, HeartPulse, StretchVertical, Star } from 'lucide-react';

const workoutFormSchema = z.object({
  type: z.enum(['strength', 'cardio', 'mobility'], {
    required_error: 'Please select a workout type.',
  }),
  name: z.string().min(2, { message: 'Workout name must be at least 2 characters.' }),
  sets: z.coerce.number().int().positive().optional(),
  reps: z.coerce.number().int().positive().optional(),
  weightKg: z.coerce.number().positive().optional(),
  minutes: z.coerce.number().int().positive().optional(),
  steps: z.coerce.number().int().positive().optional(),
});

type WorkoutFormValues = z.infer<typeof workoutFormSchema>;

// Mock function to calculate XP
const calculateXp = (data: WorkoutFormValues) => {
  let xp = 0;
  if (data.type === 'strength') {
    xp += (data.sets || 0) * (data.reps || 0) * (data.weightKg || 1) * 0.5;
  } else if (data.type === 'cardio') {
    xp += (data.minutes || 0) * 2;
    xp += (data.steps || 0) * 0.05;
  } else if (data.type === 'mobility') {
    xp += (data.minutes || 0) * 1.5;
  }
  return Math.round(xp);
}

export function LogWorkoutForm() {
  const [workoutType, setWorkoutType] = useState<string | undefined>();
  const { toast } = useToast();

  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<WorkoutFormValues> = (data) => {
    const xpGained = calculateXp(data);
    console.log('Workout logged:', data, 'XP Gained:', xpGained);
    toast({
      title: 'Workout Logged!',
      description: (
        <div className="flex flex-col gap-2">
          <span>{data.name} has been added to your history.</span>
          <div className="flex items-center font-bold text-yellow-500">
            <Star className="mr-1 h-4 w-4 fill-yellow-400" />
            <span>+ {xpGained} XP</span>
          </div>
        </div>
      )
    });
    form.reset();
    setWorkoutType(undefined);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workout Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setWorkoutType(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a workout type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="strength">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4" /> Strength
                    </div>
                  </SelectItem>
                  <SelectItem value="cardio">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="h-4 w-4" /> Cardio
                    </div>
                  </SelectItem>
                  <SelectItem value="mobility">
                    <div className="flex items-center gap-2">
                      <StretchVertical className="h-4 w-4" /> Mobility
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {workoutType && (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workout Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Bench Press, Morning Run" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {workoutType === 'strength' && (
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="sets"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sets</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="3" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reps</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weightKg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {workoutType === 'cardio' && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minutes</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="steps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Steps (optional)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="3500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {workoutType === 'mobility' && (
              <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minutes</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="15" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full">
              Log Workout
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
