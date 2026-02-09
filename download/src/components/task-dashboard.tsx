'use client';

import { useTasks } from '@/contexts/tasks-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { TaskForm } from './task-form';
import { TaskList } from './task-list';
import { Skeleton } from './ui/skeleton';
import { DailyQuote } from './daily-quote';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useState, useEffect, useMemo } from 'react';
import { TaskStats } from './task-stats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TaskDashboard() {
  const { isFormOpen, closeForm, editingTask, isLoaded, tasks } = useTasks();
  const [greeting, setGreeting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (activeFilter === 'Active') {
      filtered = filtered.filter((task) => task.status !== 'Completed');
    } else if (activeFilter === 'Completed') {
      filtered = filtered.filter((task) => task.status === 'Completed');
    }

    if (searchQuery) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [tasks, searchQuery, activeFilter]);

  return (
    <div className="p-4 sm:p-6">
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 px-4 sm:px-6 py-4 mb-6 border-b">
        <p className="text-muted-foreground">{greeting}</p>
        <h1 className="text-3xl font-bold text-foreground">
          Let's be productive!
        </h1>
        <DailyQuote />
      </header>

      <main>
        <TaskStats />

        <div className="relative mb-4">
          <Input
            placeholder="Search tasks..."
            className="pl-10 h-12 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        <Tabs
          defaultValue="All"
          onValueChange={setActiveFilter}
          className="w-full mb-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Active">Active</TabsTrigger>
            <TabsTrigger value="Completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoaded ? (
          <TaskList tasks={filteredTasks} />
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </div>
        )}
      </main>

      <Dialog open={isFormOpen} onOpenChange={(open) => !open && closeForm()}>
        <DialogContent className="sm:max-w-lg w-full h-full sm:h-auto sm:rounded-3xl bg-card/80 backdrop-blur-lg border-border/50">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">
              {editingTask ? 'Edit Task' : 'Add a New Task'}
            </DialogTitle>
            <DialogDescription>
              {editingTask
                ? 'Update the details of your task.'
                : 'Fill in the details below to create a new task.'}
            </DialogDescription>
          </DialogHeader>
          <TaskForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
