'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { monsters, userProfile, userStats } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Shield, Swords, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const getMonster = (id: string) => monsters.find(m => m.id === id);

// Simplified combat logic
const calculateMaxHealth = (level: number, stamina: number) => {
    return 50 + (level * 10) + (stamina * 5);
}

const calculateDamage = (strength: number) => {
    return Math.floor(strength * 1.5 + Math.random() * 5);
}

const calculateMonsterDamage = (level: number) => {
    return Math.floor(level * 3 + Math.random() * 3);
}

export default function BattleArenaPage() {
  const params = useParams();
  const router = useRouter();
  const monsterId = params.monsterId as string;
  const monster = getMonster(monsterId);

  const [playerMaxHealth, setPlayerMaxHealth] = useState(0);
  const [monsterMaxHealth, setMonsterMaxHealth] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(0);
  const [monsterHealth, setMonsterHealth] = useState(0);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isBattleOver, setIsBattleOver] = useState(false);
  const [winner, setWinner] = useState<'player' | 'monster' | null>(null);

  useEffect(() => {
    if (monster) {
      const pMaxHealth = calculateMaxHealth(userStats.level, userStats.sta);
      const mMaxHealth = calculateMaxHealth(monster.level, 10);
      setPlayerMaxHealth(pMaxHealth);
      setPlayerHealth(pMaxHealth);
      setMonsterMaxHealth(mMaxHealth);
      setMonsterHealth(mMaxHealth);
      setBattleLog([`The battle against ${monster.name} begins!`]);
    }
  }, [monster]);


  if (!monster) {
    return <div>Monster not found!</div>;
  }
  
  const handleSkillClick = (skillName: string) => {
    if (isBattleOver) return;

    let newPlayerHealth = playerHealth;
    let newMonsterHealth = monsterHealth;
    const newLog: string[] = [];

    // Player's turn
    const playerDamage = calculateDamage(userStats.str);
    newMonsterHealth -= playerDamage;
    newLog.push(`You used ${skillName} and dealt ${playerDamage} damage!`);
    setMonsterHealth(Math.max(0, newMonsterHealth));

    if (newMonsterHealth <= 0) {
      newLog.push(`You defeated ${monster.name}!`);
      setIsBattleOver(true);
      setWinner('player');
      setBattleLog(prev => [...prev, ...newLog]);
      return;
    }

    // Monster's turn
    const monsterDamage = calculateMonsterDamage(monster.level);
    newPlayerHealth -= monsterDamage;
    newLog.push(`${monster.name} attacks and deals ${monsterDamage} damage!`);
    setPlayerHealth(Math.max(0, newPlayerHealth));
    
    if (newPlayerHealth <= 0) {
      newLog.push(`You were defeated by ${monster.name}...`);
      setIsBattleOver(true);
      setWinner('monster');
    }
    
    setBattleLog(prev => [...prev, ...newLog]);
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
        <div className="mt-8 text-center">
          <Alert className={`mb-4 ${winner === 'player' ? 'border-green-500' : 'border-destructive'}`}>
            <AlertTitle className="text-2xl font-bold">
              {winner === 'player' ? 'You Won!' : 'You Were Defeated!'}
            </AlertTitle>
            <AlertDescription>
              {winner === 'player' ? `You have defeated ${monster.name} and gained XP!` : `${monster.name} was too strong.`}
            </AlertDescription>
          </Alert>
           <Button onClick={() => router.push('/battle')}>Back to Battles</Button>
        </div>
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
                    <Button key={skill.name} onClick={() => handleSkillClick(skill.name)} disabled={isBattleOver}>
                        <Zap className="mr-2 h-4 w-4" />
                        {skill.name}
                    </Button>
                ))}
                </CardContent>
            </Card>
        </>
      )}

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
    </div>
  );
