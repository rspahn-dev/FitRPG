'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { userProfile } from '@/lib/data';

const profileFormSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters.'),
  fitnessGoals: z.string().min(10, 'Goals must be at least 10 characters.'),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: userProfile.displayName,
      fitnessGoals: userProfile.fitnessGoals,
      fitnessLevel: userProfile.fitnessLevel as 'beginner' | 'intermediate' | 'advanced',
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    console.log('Profile updated:', data);
    toast({
      title: 'Profile Updated!',
      description: 'Your changes have been saved successfully.',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormDescription>This will be your public name in challenges.</FormDescription>
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
                  placeholder="Describe your primary fitness goals..."
                  {...field}
                />
              </FormControl>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormDescription>
                This helps the AI tailor workout plans for you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
}
