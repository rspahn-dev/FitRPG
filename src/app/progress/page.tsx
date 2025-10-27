
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { personalRecords, recentWorkouts } from '@/lib/data';
import { Medal, Dumbbell, HeartPulse, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';


export default function ProgressPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
        <p className="text-muted-foreground">
          Visualize your hard work and see how far you've come.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              <CardTitle>Workout History</CardTitle>
          </div>
          <CardDescription>A log of your recent workout sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          {recentWorkouts.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {recentWorkouts.map((workout, index) => (
                <AccordionItem value={`item-${index}`} key={workout.id}>
                  <AccordionTrigger>
                    <div className='flex justify-between items-center w-full pr-4'>
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">{workout.name}</span>
                        <span className="text-sm text-muted-foreground">{format(parseISO(workout.ts), 'MMM d, yyyy')}</span>
                      </div>
                      <Badge variant={workout.type === 'strength' ? 'default' : 'secondary'}>{workout.type}</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      {workout.exercises.map((exercise, i) => (
                        <div key={i} className="pl-4">
                          <div className="flex items-center gap-2 font-semibold">
                            {exercise.type === 'strength' ? <Dumbbell className="h-4 w-4 text-primary" /> : <HeartPulse className="h-4 w-4 text-red-500" />}
                            <span>{exercise.name}</span>
                          </div>
                          <div className="pl-6 text-sm text-muted-foreground">
                            {exercise.type === 'strength' && exercise.sets && (
                              <ul className="list-disc pl-5">
                                {exercise.sets.map((set, setIndex) => (
                                  <li key={setIndex}>{set.reps} reps @ {set.weightKg}kg</li>
                                ))}
                              </ul>
                            )}
                            {exercise.type === 'cardio' && (
                              <span>{exercise.minutes} minutes</span>
                            )}
                          </div>
                          {i < workout.exercises.length - 1 && <Separator className="mt-4" />}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className='text-muted-foreground'>No workouts logged yet. Go complete a session!</p>
          )}
        </CardContent>
      </Card>

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
