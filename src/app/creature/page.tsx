import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userProfile, userStats } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { ProfileForm } from '@/components/profile-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, Crown, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function CreaturePage() {
  const allSkills = [
    { name: 'Quick Attack', description: 'A speedy physical attack.', unlockLevel: 1 },
    { name: 'Thunder Shock', description: 'An electric shock that may paralyze the foe.', unlockLevel: 1 },
    { name: 'Iron Defense', description: 'Hardens the body to raise Defense.', unlockLevel: 10 },
  ];
  
  const creatureSkills = allSkills.filter(skill => userStats.level >= skill.unlockLevel);

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
          <CardTitle>Creature Gear</CardTitle>
          <CardDescription>
            Equip items to boost your creature's stats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <Crown className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-semibold">{userProfile.creature.gear.helmet?.name || 'No Helmet'}</p>
                <p className="text-sm text-muted-foreground">Helmet Slot</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <Shield className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-semibold">{userProfile.creature.gear.armor?.name || 'No Armor'}</p>
                <p className="text-sm text-muted-foreground">Armor Slot</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Creature Skills</CardTitle>
          <CardDescription>
            Your creature learns new skills as it levels up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {creatureSkills.length > 0 ? (
            <div className="space-y-4">
                <TooltipProvider>
                  {allSkills.map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                             <Badge variant={userStats.level >= skill.unlockLevel ? "secondary" : "outline"} className="text-sm w-32 justify-center">{skill.name}</Badge>
                             <p className="text-muted-foreground">{skill.description}</p>
                          </div>
                          {userStats.level < skill.unlockLevel && (
                             <Tooltip>
                               <TooltipTrigger>
                                 <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                   <HelpCircle className="h-4 w-4" />
                                   <span>Lvl {skill.unlockLevel}</span>
                                 </div>
                               </TooltipTrigger>
                               <TooltipContent>
                                 <p>Unlocks at Level {skill.unlockLevel}</p>
                               </TooltipContent>
                             </Tooltip>
                          )}
                      </div>
                  ))}
                </TooltipProvider>
            </div>
          ) : (
            <p>Your creature has not learned any skills yet. Keep training!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
