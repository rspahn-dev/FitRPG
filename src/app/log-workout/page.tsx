import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogWorkoutForm } from '@/components/log-workout-form';

export default function LogWorkoutPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Log a New Workout</h1>
        <p className="text-muted-foreground">
          Record your activity to track your progress and earn XP.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Workout Details</CardTitle>
          <CardDescription>Fill in the details of your workout session.</CardDescription>
        </CardHeader>
        <CardContent>
          <LogWorkoutForm />
        </CardContent>
      </Card>
    </div>
  );
}
