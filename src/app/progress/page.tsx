
import { ProgressCharts } from '@/components/progress-charts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { personalRecords } from '@/lib/data';
import { Medal } from 'lucide-react';
import { format, parseISO } from 'date-fns';

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
      <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <Medal className="h-6 w-6 text-yellow-500" />
                <CardTitle>Personal Records</CardTitle>
            </div>
          <CardDescription>Your best performances.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Exercise</TableHead>
                        <TableHead>Record</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {personalRecords.map(pr => (
                        <TableRow key={pr.exerciseName}>
                            <TableCell className="font-medium">{pr.exerciseName}</TableCell>
                            <TableCell className="font-semibold">{pr.value}</TableCell>
                            <TableCell className="text-right text-muted-foreground">
                                {format(parseISO(pr.date), 'MMM d, yyyy')}
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
