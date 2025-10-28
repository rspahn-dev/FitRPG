
'use client';

import React, { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import type { LootItem } from '@/lib/data';

export default function DashboardPage() {
  const { toast } = useToast();
  const [bag, setBag] = useState(userProfile.bag);
  const xpPercentage = (userStats.xp / userStats.xpToNext) * 100;

  const handleUseItem = (itemToUse: LootItem, index: number) => {
    // In a real app, apply item effect here.
    console.log(`Used ${itemToUse.name}`);

    // Remove item from bag
    const newBag = bag.filter((_, i) => i !== index);
    setBag(newBag);

    // Show toast
    toast({
      title: 'Item Used!',
      description: `You used ${itemToUse.name}.`,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome Back, {userProfile.creature.name}!
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
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
           <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                    Jump right back into the action.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button asChild className="flex-1" size="lg">
                  <Link href="/log-workout"><PenSquare /> Log Workout</Link>
              </Button>
              <Button asChild variant="secondary" className="flex-1" size="lg">
                  <Link href="/battle"><Swords /> Go to Battle</Link>
              </Button>
            </CardContent>
        </Card>
        
        {/* Your Bag */}
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Your Bag</CardTitle>
                <CardDescription>Items collected from battles.</CardDescription>
            </CardHeader>
            <CardContent>
                {bag.length > 0 ? (
                    <div className="space-y-4">
                        {bag.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-yellow-500" />
                                    <div>
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" onClick={() => handleUseItem(item, index)}>Use</Button>
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
