'use client';
import { TaskStats } from './task-stats';

export function StatsView() {
  return (
    <div className="p-4 sm:p-6">
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 px-4 sm:px-6 py-4 mb-6 border-b">
        <h1 className="text-3xl font-bold text-foreground">Your Statistics</h1>
        <p className="text-muted-foreground">A look at your productivity.</p>
      </header>
      <main>
        <TaskStats />
      </main>
    </div>
  );
}
