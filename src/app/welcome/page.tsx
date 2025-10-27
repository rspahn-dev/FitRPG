import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateCreatureForm } from '@/components/create-creature-form';

export default function WelcomePage() {
  return (
    <div className="mx-auto w-full max-w-2xl py-8">
      <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to FitRPG!</h1>
        <p className="text-xl text-muted-foreground">
          Your fitness journey begins now. Let's create your companion creature!
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create Your Creature</CardTitle>
          <CardDescription>
            This creature will grow stronger as you work out. Give it a name and tell us your goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateCreatureForm />
        </CardContent>
      </Card>
    </div>
  );
}
