
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { friends } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function SocialPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Social</h1>
        <p className="text-muted-foreground">
          Connect with friends and check out their progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {friends.map((friend) => (
          <Card key={friend.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
                <div className="relative">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={friend.creature.image} alt={friend.creature.name} />
                        <AvatarFallback>{friend.displayName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {friend.isOnline && (
                        <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full border-2 border-background bg-green-500" />
                    )}
                </div>
              <div className="flex-1">
                <CardTitle>{friend.displayName}</CardTitle>
                <CardDescription>Level {friend.level} • {friend.creature.species}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">Creature: <span className="font-semibold text-foreground">{friend.creature.name}</span></p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" variant="outline">View Profile</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
