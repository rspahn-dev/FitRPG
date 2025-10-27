
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Flame,
  LineChart,
  ShieldCheck,
  Star,
  Dumbbell,
  Swords,
  PenSquare,
  Zap,
} from 'lucide-react';
import { userProfile, userStats } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

export default function DashboardPage() {
  const xpPercentage = (userStats.xp / userStats.xpToNext) * 100;

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome Back, {userProfile.displayName}!
        </h1>
        <p className="text-muted-foreground">
          Here's a snapshot of your progress. Keep up the great work!
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Lvl {userStats.level}</div>
            <p className="text-xs text-muted-foreground">
              {userStats.xp} / {userStats.xpToNext} XP
            </p>
            <Progress value={xpPercentage} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workout Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.streakDays} Days</div>
            <p className="text-xs text-muted-foreground">
              Current active streak
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Workouts This Week
            </CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats.workoutsThisWeek}
            </div>
            <p className="text-xs text-muted-foreground">
              Great consistency!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Minutes
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStats.activeMinutesThisWeek}
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Creature Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Companion</CardTitle>
            <CardDescription>
              Your creature grows stronger with every workout you complete.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage
                src={userProfile.creature.image}
                alt={userProfile.creature.name}
              />
              <AvatarFallback>
                {userProfile.creature.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{userProfile.creature.name}</h3>
              <p className="text-muted-foreground">
                {userProfile.creature.species}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-bold text-lg">{userStats.str}</p>
                  <p className="text-xs text-muted-foreground">Strength</p>
                </div>
                <div>
                  <p className="font-bold text-lg">{userStats.agi}</p>
                  <p className="text-xs text-muted-foreground">Agility</p>
                </div>
                <div>
                  <p className="font-bold text-lg">{userStats.sta}</p>
                  <p className="text-xs text-muted-foreground">Stamina</p>
                </div>
              </div>
            </div>
          </CardContent>
           <CardFooter className="flex gap-4">
              <Button asChild className="flex-1">
                  <Link href="/log-workout"><PenSquare /> Log Workout</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                  <Link href="/battle"><Swords /> Battle</Link>
              </Button>
            </CardFooter>
        </Card>
        
        {/* Your Bag */}
        <Card>
            <CardHeader>
                <CardTitle>Your Bag</CardTitle>
                <CardDescription>Items collected from battles.</CardDescription>
            </CardHeader>
            <CardContent>
                {userProfile.bag.length > 0 ? (
                    <div className="space-y-4">
                        {userProfile.bag.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-yellow-500" />
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline">Use</Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-sm text-muted-foreground py-4">
                        <p>Your bag is empty.</p>
                        <p>Defeat monsters to find loot!</p>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
