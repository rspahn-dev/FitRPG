import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileForm } from '@/components/profile-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { userProfile } from '@/lib/data';

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8 flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://picsum.photos/seed/user/128/128" alt="User" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="text-center">
            <h1 className="text-3xl font-bold">{userProfile.displayName}</h1>
            <p className="text-muted-foreground">alex@example.com</p>
        </div>
        <Button variant="outline">Change Photo</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            Update your personal details and fitness preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
