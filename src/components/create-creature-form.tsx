
'use client';

import { useForm } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { generateCreatureSuggestionAction } from '@/app/actions';
import { Wand2, Loader2 } from 'lucide-react';
import { useState } from 'react';

const creatureFormSchema = z.object({
  creatureName: z.string().min(2, 'Name must be at least 2 characters.'),
  creatureType: z.string().min(2, 'Type must be at least 2 characters.'),
  fitnessGoals: z.string().min(10, 'Goals must be at least 10 characters.'),
});

type CreatureFormValues = z.infer<typeof creatureFormSchema>;

export function CreateCreatureForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<CreatureFormValues>({
    resolver: zodResolver(creatureFormSchema),
    defaultValues: {
      creatureName: '',
      creatureType: '',
      fitnessGoals: '',
    },
  });

  const handleCreateCreature = (data: CreatureFormValues) => {
    // In a real app, you would save this data to your backend, associated with the logged-in user.
    // e.g., using a Firestore document for the user's profile.
    console.log('Creature Created:', data);
    toast({
      title: 'Creature Created!',
      description: `Welcome, ${data.creatureName}! Let the journey begin.`,
    });
    router.push('/');
  };

  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    try {
      const suggestion = await generateCreatureSuggestionAction();
      if (suggestion) {
        form.reset({
          creatureName: suggestion.creatureName,
          creatureType: suggestion.creatureType,
          fitnessGoals: suggestion.fitnessGoals,
        });
        toast({
          title: 'Suggestion Generated!',
          description: 'The AI has crafted a new creature for you.',
        });
      } else {
        throw new Error('Received an empty suggestion.');
      }
    } catch (error) {
      console.error('Failed to generate suggestion:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'The AI could not generate a suggestion at this time.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateCreature)} className="space-y-6">
        <div className="flex items-center justify-end">
            <Button type="button" variant="outline" onClick={handleAutoGenerate} disabled={isGenerating}>
            {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Wand2 className="mr-2 h-4 w-4" />
            )}
            Auto-generate
            </Button>
        </div>

        <FormField
          control={form.control}
          name="creatureName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creature Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Sparky, Blaze, Terra" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="creatureType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creature Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Fire, Water, Electric Squirrel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fitnessGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fitness Goals</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., I want to run a 5k, get stronger for hiking, or improve my overall health."
                  {...field}
                />
              </FormControl>
              <FormDescription>This will help tailor your FitRPG experience.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" size="lg" className="w-full" disabled={isGenerating}>
          Create My Creature & Begin
        </Button>
      </form>
    </Form>
  );
}
