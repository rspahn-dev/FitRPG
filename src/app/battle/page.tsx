import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { monsters } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Swords } from 'lucide-react';

export default function BattlePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Monster Battles</h1>
        <p className="text-muted-foreground">
          Test your might against fearsome creatures.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {monsters.map((monster) => (
          <Card key={monster.id} className="flex flex-col">
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
              </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    <Swords className="mr-2 h-4 w-4" />
                    Battle
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
