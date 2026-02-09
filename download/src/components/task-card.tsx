'use client';
import type { Task } from '@/lib/types';
import { useTasks } from '@/contexts/tasks-context';
import { Check, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { format, parseISO, isToday, isBefore, startOfToday } from 'date-fns';

const priorityStyles: Record<string, { dot: string; text: string }> = {
  High: { dot: 'bg-destructive', text: 'text-destructive' },
  Medium: { dot: 'bg-primary', text: 'text-primary' },
  Low: { dot: 'bg-secondary-foreground', text: 'text-secondary-foreground' },
};

export function TaskCard({ task }: { task: Task }) {
  const { openForm, deleteTask, updateTask } = useTasks();
  const isCompleted = task.status === 'Completed';

  const dueDate = task.dueDate ? parseISO(task.dueDate) : null;
  const isUrgent =
    dueDate &&
    !isCompleted &&
    (isBefore(dueDate, startOfToday()) || isToday(dueDate));

  const handleToggleComplete = () => {
    updateTask(task.id, {
      status: isCompleted ? 'In Progress' : 'Completed',
    });
  };

  return (
    <Card
      className={cn(
        'rounded-3xl shadow-lg border-2 border-transparent transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50',
        isCompleted && 'bg-card/50 opacity-70'
      )}
    >
      <CardContent className="p-4 flex items-start gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggleComplete}
          className={cn(
            'h-10 w-10 rounded-full border-2 shrink-0 transition-colors',
            isCompleted
              ? 'bg-primary border-primary text-primary-foreground'
              : 'border-border hover:bg-accent'
          )}
        >
          <Check className="h-6 w-6" />
        </Button>
        <div className="flex-grow">
          <p
            className={cn(
              'font-bold text-lg text-foreground',
              isCompleted && 'line-through text-muted-foreground'
            )}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-4 mt-3 text-sm">
            {dueDate ? (
              <span
                className={cn(
                  'text-muted-foreground',
                  isUrgent && 'font-semibold text-destructive'
                )}
              >
                Due: {format(dueDate, 'MMM d')}
              </span>
            ) : (
              <span className="text-muted-foreground">No Deadline</span>
            )}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'h-2 w-2 rounded-full',
                  priorityStyles[task.priority]?.dot
                )}
              ></div>
              <span
                className={cn(
                  'font-medium',
                  priorityStyles[task.priority]?.text
                )}
              >
                {task.priority}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => openForm(task)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive/80 hover:text-destructive"
            onClick={() => deleteTask(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
