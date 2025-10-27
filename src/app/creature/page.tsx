import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userProfile } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CreaturePage() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <div className="flex flex-col items-center gap-4">
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
          <CardTitle>Skills</CardTitle>
          <CardDescription>
            Your creature's abilities for use in battle.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {userProfile.creature.skills.length > 0 ? (
            <div className="space-y-4">
                {userProfile.creature.skills.map((skill) => (
                    <div key={skill.name} className="flex items-start gap-4">
                        <Badge variant="secondary" className="text-sm">{skill.name}</Badge>
                        <p className="text-muted-foreground">{skill.description}</p>
                    </div>
                ))}
            </div>
          ) : (
            <p>Your creature has not learned any skills yet. Keep training!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
