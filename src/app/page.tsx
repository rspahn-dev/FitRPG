import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dumbbell, Shield, Zap, Star, Heart, Brain } from 'lucide-react';
import { userStats, recentWorkouts, userProfile } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Progress } from '@/components/ui/progress';

export default function Home() {
  const xpPercentage = (userStats.xp / userStats.xpToNext) * 100;

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <img src={userProfile.creature.image} alt="Creature" className="h-24 w-24 rounded-lg border-2 border-primary" />
            <div className="flex-1">
              <CardTitle className="text-3xl">{userProfile.creature.name}</CardTitle>
              <CardDescription>Level {userStats.level} {userProfile.creature.species}</CardDescription>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>XP</span>
                  <span>{userStats.xp} / {userStats.xpToNext}</span>
                </div>
                <Progress value={xpPercentage} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
           <div className="flex items-center gap-4 rounded-lg border p-4">
             <div className="rounded-full bg-red-500/10 p-2 text-red-500">
                <Heart className="h-6 w-6" />
             </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stamina</p>
                <p className="text-xl font-bold">{userStats.sta}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-green-500/10 p-2 text-green-500">
                 <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Agility</p>
                <p className="text-xl font-bold">{userStats.agi}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="rounded-full bg-blue-500/10 p-2 text-blue-500">
                <Dumbbell className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Strength</p>
                <p className="text-xl font-bold">{userStats.str}</p>
              </div>
            </div>
        </CardContent>
      </Card>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Workouts This Week
            </CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.workoutsThisWeek}</div>
            <p className="text-xs text-muted-foreground">
              Keep up the great work!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Minutes</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.activeMinutesThisWeek}</div>
            <p className="text-xs text-muted-foreground">Total for this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.streakDays} days</div>
            <p className="text-xs text-muted-foreground">Don't break the chain</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workout</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentWorkouts.map((workout) => (
                <TableRow key={workout.id}>
                  <TableCell className="font-medium">{workout.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {workout.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatDistanceToNow(new Date(workout.ts), {
                      addSuffix: true,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
