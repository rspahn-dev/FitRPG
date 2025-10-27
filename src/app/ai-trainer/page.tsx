import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AiTrainerForm from '@/components/ai-trainer-form';
import { Bot } from 'lucide-react';

export default function AiTrainerPage() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-primary/10 p-4 text-primary">
          <Bot className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">AI Workout Sage</h1>
        <p className="text-muted-foreground">
          Get a personalized workout plan generated just for you. Tell the sage
          about your goals, and it will devise a path to success.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Fitness Profile</CardTitle>
          <CardDescription>
            The more details you provide, the better your plan will be.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AiTrainerForm />
        </CardContent>
      </Card>
    </div>
  );
}
