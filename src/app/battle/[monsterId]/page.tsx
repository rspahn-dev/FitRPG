
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { monsters, userProfile, userStats } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Shield, Swords, Zap, Heart, Wind } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type AttackAnimation = {
  target: 'player' | 'monster';
  type: 'damage' | 'effect';
  value: number | string;
  id: number;
};

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

const skillIcons: { [key: string]: React.ElementType } = {
    'Quick Attack': Wind,
    'Thunder Shock': Zap,
    default: Swords,
};

export default function BattleArenaPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const monsterId = params.monsterId as string;
  const monster = getMonster(monsterId);

  const [playerMaxHealth, setPlayerMaxHealth] = useState(0);
  const [monsterMaxHealth, setMonsterMaxHealth] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(0);
  const [monsterHealth, setMonsterHealth] = useState(0);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isBattleOver, setIsBattleOver] = useState(false);
  const [winner, setWinner] = useState<'player' | 'monster' | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  
  const [playerHit, setPlayerHit] = useState(false);
  const [monsterHit, setMonsterHit] = useState(false);

  const [attackAnimations, setAttackAnimations] = useState<AttackAnimation[]>([]);

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
  
  const addAnimation = (target: 'player' | 'monster', type: 'damage', value: number) => {
    const id = Date.now() + Math.random();
    setAttackAnimations(prev => [...prev, { target, type, value, id }]);
    setTimeout(() => {
      setAttackAnimations(prev => prev.filter(anim => anim.id !== id));
    }, 1000);
  };

  const handlePlayerVictory = (log: string[]) => {
    log.push(`You defeated ${monster.name}!`);
    if (monster.loot) {
      userProfile.bag.push(monster.loot);
      log.push(`You found a ${monster.loot.name}!`);
      toast({
        title: "Loot Acquired!",
        description: `You found a ${monster.loot.name} from ${monster.name}.`,
      })
    }
    setBattleLog(prev => [...prev, ...log]);
    setIsBattleOver(true);
    setWinner('player');
  }

  const handleSkillClick = (skillName: string) => {
    if (!isPlayerTurn || isBattleOver || !monster) return;

    setIsPlayerTurn(false);
    const newLog: string[] = [];

    // Player's turn
    const playerDamage = calculateDamage(userStats.str);
    const newMonsterHealth = Math.max(0, monsterHealth - playerDamage);
    newLog.push(`You used ${skillName} and dealt ${playerDamage} damage!`);
    
    setMonsterHit(true);
    addAnimation('monster', 'damage', playerDamage);
    setTimeout(() => {
        setMonsterHealth(newMonsterHealth);
        setMonsterHit(false);
    }, 200);

    if (newMonsterHealth <= 0) {
      setTimeout(() => {
        handlePlayerVictory(newLog);
      }, 500);
      return;
    }

    // Monster's turn after a delay
    setTimeout(() => {
      const monsterDamage = calculateMonsterDamage(monster.level);
      const newPlayerHealth = Math.max(0, playerHealth - monsterDamage);
      newLog.push(`${monster.name} attacks and deals ${monsterDamage} damage!`);
      
      setPlayerHit(true);
      addAnimation('player', 'damage', monsterDamage);
      setTimeout(() => {
        setPlayerHealth(newPlayerHealth);
        setPlayerHit(false);
      }, 200);

      if (newPlayerHealth <= 0) {
        setTimeout(() => {
          newLog.push(`You were defeated by ${monster.name}...`);
          setBattleLog(prev => [...prev, ...newLog]);
          setIsBattleOver(true);
          setWinner('monster');
        }, 500);
      } else {
        setIsPlayerTurn(true);
      }
      setBattleLog(prev => [...prev, ...newLog]);
    }, 1000);
  };
  
  if (!monster) {
    return <div>Monster not found!</div>;
  }

  const getSkillIcon = (skillName: string) => {
      const Icon = skillIcons[skillName] || skillIcons.default;
      return <Icon className="mr-2 h-4 w-4" />;
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes float-up {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-50px);
          }
        }
        .animate-float-up {
          animation: float-up 1s forwards;
        }
        @keyframes slash-anim {
          0% { opacity: 1; transform: translate(-50%, -50%) rotate(-45deg) scale(0); }
          50% { transform: translate(-50%, -50%) rotate(-45deg) scale(1.2); }
          100% { opacity: 0; transform: translate(-50%, -50%) rotate(-45deg) scale(1.5); }
        }
        .animate-slash::before {
            content: '⚔️';
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 4rem;
            color: white;
            text-shadow: 0 0 10px red;
            animation: slash-anim 0.4s ease-out forwards;
        }
      `}</style>
      <h1 className="mb-8 text-center text-4xl font-bold">
        <Swords className="inline-block h-10 w-10 mr-4" />
        Battle!
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Player Creature */}
        <Card className="flex flex-col">
          <CardHeader className="items-center">
            <div className="relative">
                <img 
                src={userProfile.creature.image} 
                alt={userProfile.creature.name}
                className={cn("h-32 w-32 rounded-full border-4 border-primary object-cover transition-transform", playerHit && 'animate-shake')}
                />
                {attackAnimations.filter(a => a.target === 'player').map(anim => (
                    <div key={anim.id} className="animate-float-up absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-red-500" style={{ textShadow: '0 0 5px white' }}>
                        -{anim.value}
                    </div>
                ))}
                {playerHit && <div className="animate-slash absolute inset-0"></div>}
            </div>
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
             <div className="relative">
                <img 
                src={monster.image} 
                alt={monster.name}
                className={cn("h-32 w-32 rounded-full border-4 border-destructive object-cover transition-transform", monsterHit && 'animate-shake')}
                />
                 {attackAnimations.filter(a => a.target === 'monster').map(anim => (
                    <div key={anim.id} className="animate-float-up absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white" style={{ textShadow: '0 0 5px black' }}>
                        -{anim.value}
                    </div>
                ))}
                {monsterHit && <div className="animate-slash absolute inset-0"></div>}
            </div>
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
              {winner === 'player' ? `You have defeated ${monster.name}!` : `${monster.name} was too strong.`}
              {winner === 'player' && monster.loot && ` You found a ${monster.loot.name}!`}
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
                    <Button key={skill.name} onClick={() => handleSkillClick(skill.name)} disabled={!isPlayerTurn || isBattleOver}>
                        {getSkillIcon(skill.name)}
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
}
