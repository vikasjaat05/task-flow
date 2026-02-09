'use client';
import { useTasks } from '@/contexts/tasks-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { ListChecks, CheckCheck, Clock } from 'lucide-react';

const StatCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export function TaskStats() {
  const { tasks } = useTasks();
  const [completionPercentage, setCompletionPercentage] = useState(0);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === 'Completed'
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  useEffect(() => {
    if (totalTasks > 0) {
      setCompletionPercentage(Math.round((completedTasks / totalTasks) * 100));
    } else {
      setCompletionPercentage(0);
    }
  }, [tasks, totalTasks, completedTasks]);

  return (
    <div className="mb-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-muted-foreground">
            Daily Progress
          </span>
          <span className="text-sm font-bold text-primary">
            {completionPercentage}%
          </span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>
      <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={<ListChecks className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Completed"
          value={completedTasks}
          icon={<CheckCheck className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Pending"
          value={pendingTasks}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
    </div>
  );
}
