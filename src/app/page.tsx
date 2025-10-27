import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Flame, Zap, Award } from 'lucide-react';
import { userStats, recentWorkouts } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format, formatDistanceToNow } from 'date-fns';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            <CardTitle className="text-sm font-medium">Energy Burned</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.energyToday}</div>
            <p className="text-xs text-muted-foreground">
              Energy points earned today
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
            <Award className="h-4 w-4 text-muted-foreground" />
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
