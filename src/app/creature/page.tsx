

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userProfile, userStats, allSkills } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, Crown, Dumbbell, Wind, Heart } from 'lucide-react';

export default function CreaturePage() {
  
  const creatureSkills = allSkills.filter(skill => userStats.level >= skill.unlockLevel);

  const statItems = [
      { name: 'Strength', value: userStats.str, icon: Dumbbell, color: 'text-red-500' },
      { name: 'Agility', value: userStats.agi, icon: Wind, color: 'text-green-500' },
      { name: 'Stamina', value: userStats.sta, icon: Heart, color: 'text-blue-500' },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <div className="flex flex-col items-center gap-6">
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
          <CardTitle>Creature Stats</CardTitle>
          <CardDescription>
            These stats grow as your creature levels up from your workouts.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
                {statItems.map(stat => (
                    <div key={stat.name} className="flex flex-col items-center gap-2">
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        <p className="font-bold text-4xl">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.name}</p>
                    </div>
                ))}
            </div>
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
              {creatureSkills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                         <Badge variant={"secondary"} className="text-sm w-32 justify-center">{skill.name}</Badge>
                         <p className="text-muted-foreground">{skill.description}</p>
                      </div>
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
