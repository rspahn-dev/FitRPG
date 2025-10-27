import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userProfile } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default function CreaturePage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8 flex flex-col items-center gap-4">
        <img 
            src={userProfile.creature.image} 
            alt={userProfile.creature.name}
            className="h-48 w-48 rounded-full border-4 border-primary object-cover"
        />
        <div className="text-center">
            <h1 className="text-4xl font-bold">{userProfile.creature.name}</h1>
            <p className="text-xl text-muted-foreground">{userProfile.creature.species}</p>
        </div>
        <Button>Customize Creature</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Creature Details</CardTitle>
          <CardDescription>
            Here you can view and customize your FitRPG companion.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Customization options coming soon!</p>
        </CardContent>
      </Card>
    </div>
  );
}
