import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { communityChallenges } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';

export default function ChallengesPage() {
  const getImage = (id: string) => {
    return PlaceHolderImages.find(img => img.id === id);
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Community Challenges</h1>
        <p className="text-muted-foreground">
          Join a challenge, compete with others, and earn rewards.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {communityChallenges.map((challenge) => {
          const image = getImage(challenge.image);
          return (
            <Card key={challenge.id} className="flex flex-col">
              <CardHeader className="p-0">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={600}
                    height={400}
                    data-ai-hint={image.imageHint}
                    className="aspect-video w-full rounded-t-lg object-cover"
                  />
                )}
              </CardHeader>
              <div className="flex flex-1 flex-col p-6">
                <CardTitle>{challenge.title}</CardTitle>
                <CardDescription className="mt-2 flex-1">{challenge.description}</CardDescription>
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} aria-label={`${challenge.title} progress`} />
                </div>
              </div>
              <CardFooter className="flex-col items-start gap-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                    <Trophy className="h-4 w-4"/>
                    <span>Reward: {challenge.reward}</span>
                  </div>
                  <Button className="w-full">Join Challenge</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
