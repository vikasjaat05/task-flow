'use client';
import { Home, ListTodo, BarChart2, User, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useTasks, type View } from '@/contexts/tasks-context';

export function BottomNav() {
  const { openForm, activeView, setActiveView } = useTasks();
  const navItems = [
    { id: 'Home', icon: Home, label: 'Home' },
    { id: 'Tasks', icon: ListTodo, label: 'Tasks' },
    { id: 'Stats', icon: BarChart2, label: 'Stats' },
    { id: 'Profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-1/2 z-50 h-20 w-full max-w-lg -translate-x-1/2 border-t border-border/50 bg-background/50 backdrop-blur-xl">
        <div className="flex h-full items-center justify-around">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              onClick={() => setActiveView(item.id as View)}
              className={`flex h-full flex-col items-center justify-center gap-1 rounded-none px-4 ${
                activeView === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
      <Button
        onClick={() => openForm()}
        className="fixed bottom-24 right-1/2 z-50 h-16 w-16 translate-x-[11rem] rounded-full bg-primary p-0 shadow-lg shadow-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/50 active:scale-95 sm:right-auto sm:left-1/2 sm:translate-x-[11rem]"
      >
        <Plus className="h-8 w-8" />
        <span className="sr-only">Add Task</span>
      </Button>
    </>
  );
}
