import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userProfile } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { ProfileForm } from '@/components/profile-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function CreaturePage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-48 w-48 border-4 border-primary">
            <AvatarImage src={userProfile.creature.image} alt={userProfile.creature.name} />
            <AvatarFallback>{userProfile.creature.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center">
            <h1 className="text-4xl font-bold">{userProfile.creature.name}</h1>
            <p className="text-xl text-muted-foreground">{userProfile.creature.species}</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>
            Update your personal details and fitness preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Creature Skills</CardTitle>
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
