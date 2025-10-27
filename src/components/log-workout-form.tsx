
'use client';

import { useForm, useFieldArray, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Dumbbell, HeartPulse, Star, Trash2, PlusCircle, Save, Bed } from 'lucide-react';
import { Separator } from './ui/separator';
import { Card, CardContent } from './ui/card';
import { workoutTemplates } from '@/lib/data';

const exerciseSchema = z.object({
  type: z.enum(['strength', 'cardio'], {
    required_error: 'Please select an exercise type.',
  }),
  name: z.string().min(2, { message: 'Exercise name must be at least 2 characters.' }),
  sets: z.coerce.number().int().positive().optional(),
  reps: z.coerce.number().int().positive().optional(),
  weightKg: z.coerce.number().positive().optional(),
  minutes: z.coerce.number().int().positive().optional(),
});

const workoutFormSchema = z.object({
  workoutName: z.string().min(2, "Workout name must be at least 2 characters."),
  exercises: z.array(exerciseSchema).min(1, "Please add at least one exercise."),
});

type WorkoutFormValues = z.infer<typeof workoutFormSchema>;
type ExerciseFormValues = z.infer<typeof exerciseSchema>;

// Mock function to calculate XP
const calculateXp = (data: ExerciseFormValues) => {
  let xp = 0;
  if (data.type === 'strength') {
    xp += (data.sets || 0) * (data.reps || 0) * (data.weightKg || 1) * 0.5;
  } else if (data.type === 'cardio') {
    xp += (data.minutes || 0) * 2;
  }
  return Math.round(xp);
}

export function LogWorkoutForm() {
  const { toast } = useToast();

  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      workoutName: '',
      exercises: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'exercises',
  });

  const watchExercises = form.watch('exercises');

  const onSubmit: SubmitHandler<WorkoutFormValues> = (data) => {
    const totalXpGained = data.exercises.reduce((total, exercise) => total + calculateXp(exercise), 0);
    console.log('Workout logged:', data, 'Total XP Gained:', totalXpGained);
    toast({
      title: 'Workout Logged!',
      description: (
        <div className="flex flex-col gap-2">
          <span>{data.workoutName} has been added to your history.</span>
          <div className="flex items-center font-bold text-yellow-500">
            <Star className="mr-1 h-4 w-4 fill-yellow-400" />
            <span>+ {totalXpGained} XP</span>
          </div>
        </div>
      ),
    });
    form.reset();
  };

  const handleSaveTemplate = () => {
    const values = form.getValues();
    if (values.exercises.length > 0) {
        console.log("Saving workout as template:", values);
        toast({
            title: "Template Saved!",
            description: `"${values.workoutName}" has been saved as a new workout template.`
        })
    } else {
        toast({
            variant: "destructive",
            title: "Cannot Save Template",
            description: "Please add at least one exercise before saving as a template."
        })
    }
  }

  const loadTemplate = (templateId: string) => {
    const template = workoutTemplates.find(t => t.id === templateId);
    if (template) {
        form.setValue("workoutName", template.name);
        form.setValue("exercises", template.exercises as any);
        toast({
            title: "Template Loaded",
            description: `Loaded the "${template.name}" template.`
        })
    }
  }

  const handleLogRestDay = () => {
    const xpGained = 25; // Small reward for consistency
    toast({
        title: "Rest Day Logged!",
        description: (
            <div className="flex flex-col gap-2">
                <span>Rest is essential for growth. Good job!</span>
                <div className="flex items-center font-bold text-yellow-500">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400" />
                    <span>+ {xpGained} XP</span>
                </div>
            </div>
        )
    });
    // In a real app, you'd also save this to the user's history
    console.log("Rest day logged. XP Gained:", xpGained);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Select onValueChange={loadTemplate}>
            <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder="Load from Template" />
            </SelectTrigger>
            <SelectContent>
                {workoutTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                        {template.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <Button type="button" variant="outline" onClick={handleSaveTemplate}>
            <Save className="mr-2 h-4 w-4" />
            Save as Template
        </Button>
        <Button type="button" variant="secondary" onClick={handleLogRestDay}>
            <Bed className="mr-2 h-4 w-4" />
            Log Rest Day
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="workoutName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Workout Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Morning Session, Leg Day" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          {fields.map((field, index) => (
            <Card key={field.id} className="relative p-4 pt-8">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => remove(index)}>
                    <Trash2 className="h-4 w-4 text-destructive"/>
                </Button>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                 <FormField
                    control={form.control}
                    name={`exercises.${index}.type`}
                    render={({ field: selectField }) => (
                        <FormItem>
                        <FormLabel>Exercise Type</FormLabel>
                        <Select
                            onValueChange={selectField.onChange}
                            defaultValue={selectField.value}
                        >
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="strength"><div className="flex items-center gap-2"><Dumbbell className="h-4 w-4" /> Strength</div></SelectItem>
                                <SelectItem value="cardio"><div className="flex items-center gap-2"><HeartPulse className="h-4 w-4" /> Cardio</div></SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                 <FormField
                    control={form.control}
                    name={`exercises.${index}.name`}
                    render={({ field: inputField }) => (
                        <FormItem>
                        <FormLabel>Exercise Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Bench Press" {...inputField} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </div>

                {watchExercises[index]?.type === 'strength' && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                    <FormField control={form.control} name={`exercises.${index}.sets`} render={({ field }) => (<FormItem><FormLabel>Sets</FormLabel><FormControl><Input type="number" placeholder="3" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name={`exercises.${index}.reps`} render={({ field }) => (<FormItem><FormLabel>Reps</FormLabel><FormControl><Input type="number" placeholder="10" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name={`exercises.${index}.weightKg`} render={({ field }) => (<FormItem><FormLabel>Weight (kg)</FormLabel><FormControl><Input type="number" placeholder="50" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                )}
                {watchExercises[index]?.type === 'cardio' && (
                <div className="mt-4">
                    <FormField control={form.control} name={`exercises.${index}.minutes`} render={({ field }) => (<FormItem><FormLabel>Minutes</FormLabel><FormControl><Input type="number" placeholder="30" {...field} /></FormControl></FormItem>)} />
                </div>
                )}

            </Card>
          ))}
          
          <div className="flex items-center gap-4">
            <Button type="button" variant="outline" onClick={() => append({ type: 'strength', name: '' })}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Exercise
            </Button>

            <Button type="submit" disabled={fields.length === 0}>
                Log Entire Workout
            </Button>
          </div>
          {form.formState.errors.exercises && <p className="text-sm font-medium text-destructive">{form.formState.errors.exercises.message}</p>}
        </form>
      </Form>
    </div>
  );
}
