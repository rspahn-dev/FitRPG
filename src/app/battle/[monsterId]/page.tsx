'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { monsters, userProfile, userStats } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Shield, Swords, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const getMonster = (id: string) => monsters.find(m => m.id === id);

// Simplified combat logic for now
const calculateMaxHealth = (level: number, stamina: number) => {
    return 50 + (level * 10) + (stamina * 5);
}

export default function BattleArenaPage() {
  const params = useParams();
  const monsterId = params.monsterId as string;
  const monster = getMonster(monsterId);

  const [playerHealth, setPlayerHealth] = useState(calculateMaxHealth(userStats.level, userStats.sta));
  const [monsterHealth, setMonsterHealth] = useState(monster ? calculateMaxHealth(monster.level, 10) : 0); // Monster has base STA
  const [battleLog, setBattleLog] = useState<string[]>(['The battle begins!']);
  const [isBattleOver, setIsBattleOver] = useState(false);
  const [winner, setWinner] = useState<'player' | 'monster' | null>(null);


  if (!monster) {
    return <div>Monster not found!</div>;
  }
  
  const playerMaxHealth = calculateMaxHealth(userStats.level, userStats.sta);
  const monsterMaxHealth = calculateMaxHealth(monster.level, 10);

  const handleSkillClick = (skillName: string) => {
    // In the next step, we will implement the full battle logic here.
    setBattleLog(prev => [...prev, `You used ${skillName}! (Battle logic coming soon)`]);
  };


  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">
        <Swords className="inline-block h-10 w-10 mr-4" />
        Battle!
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Player Creature */}
        <Card className="flex flex-col">
          <CardHeader className="items-center">
            <img 
              src={userProfile.creature.image} 
              alt={userProfile.creature.name}
              className="h-32 w-32 rounded-full border-4 border-primary object-cover"
            />
          </CardHeader>
          <CardContent className="flex-1 text-center">
            <CardTitle>{userProfile.creature.name}</CardTitle>
            <CardDescription>Level {userStats.level} {userProfile.creature.species}</CardDescription>
            <div className="mt-4">
              <Progress value={(playerHealth / playerMaxHealth) * 100} className="h-4" />
              <p className="mt-2 text-sm text-muted-foreground">{playerHealth} / {playerMaxHealth} HP</p>
            </div>
          </CardContent>
        </Card>

        {/* Monster */}
        <Card className="flex flex-col">
          <CardHeader className="items-center">
            <img 
              src={monster.image} 
              alt={monster.name}
              className="h-32 w-32 rounded-full border-4 border-destructive object-cover"
            />
          </CardHeader>
          <CardContent className="flex-1 text-center">
            <CardTitle>{monster.name}</CardTitle>
            <CardDescription>{monster.species}</CardDescription>
            <div className="mt-4">
              <Badge>Level {monster.level}</Badge>
              <div className="mt-2">
                <Progress value={(monsterHealth / monsterMaxHealth) * 100} variant="destructive" className="h-4" />
                <p className="mt-2 text-sm text-muted-foreground">{monsterHealth} / {monsterMaxHealth} HP</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isBattleOver && (
        <Alert className={`mt-8 ${winner === 'player' ? 'border-green-500' : 'border-destructive'}`}>
          <AlertTitle className="text-2xl font-bold">
            {winner === 'player' ? 'You Won!' : 'You Were Defeated!'}
          </AlertTitle>
          <AlertDescription>
            {winner === 'player' ? `You have defeated ${monster.name} and gained XP!` : `${monster.name} was too strong.`}
          </AlertDescription>
        </Alert>
      )}

      {!isBattleOver && (
        <>
            <Card className="mt-8">
                <CardHeader>
                <CardTitle>Your Skills</CardTitle>
                <CardDescription>Choose an action.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                {userProfile.creature.skills.map(skill => (
                    <Button key={skill.name} onClick={() => handleSkillClick(skill.name)}>
                        <Zap className="mr-2 h-4 w-4" />
                        {skill.name}
                    </Button>
                ))}
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Battle Log</CardTitle>
                </CardHeader>
                <CardContent className="h-32 overflow-y-auto">
                    <div className="space-y-2">
                        {battleLog.map((log, index) => (
                        <p key={index} className="text-sm text-muted-foreground">{log}</p>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
      )}

    </div>
  );
}
