import { ProgressCharts } from '@/components/progress-charts';

export default function ProgressPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
        <p className="text-muted-foreground">
          Visualize your hard work and see how far you've come.
        </p>
      </div>
      <ProgressCharts />
    </div>
  );
}
