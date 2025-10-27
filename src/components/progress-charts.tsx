'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { progressData } from '@/lib/data';

const weeklyChartConfig = {
  workouts: {
    label: 'Workouts',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const volumeChartConfig = {
    volume: {
      label: 'Volume (kg)',
      color: 'hsl(var(--accent))',
    },
} satisfies ChartConfig;

export function ProgressCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Workouts Per Week</CardTitle>
          <CardDescription>
            Your consistency over the last 4 weeks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={weeklyChartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={progressData.workoutsPerWeek}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="week"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="workouts" fill="var(--color-workouts)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Training Volume</CardTitle>
          <CardDescription>
            Total weight lifted over time (strength workouts).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={volumeChartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={progressData.volumeOverTime}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="volume" fill="var(--color-volume)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
