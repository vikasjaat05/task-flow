'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function ProfileView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 sm:p-6 text-center">
      <Avatar className="w-32 h-32 mb-6 shadow-lg border-4 border-primary/20">
        <AvatarFallback className="text-4xl bg-primary/20 text-primary">
          VC
        </AvatarFallback>
      </Avatar>
      <h1 className="text-4xl font-bold text-foreground">Vikas Choudhary</h1>
      <p className="text-xl text-muted-foreground mt-2">HeroTask Master</p>
    </div>
  );
}
