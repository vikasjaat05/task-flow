import { Button } from './ui/button';
import { useTasks } from '@/contexts/tasks-context';
import { PlusCircle } from 'lucide-react';

const EmptyStateIllustration = () => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto text-gray-300 dark:text-gray-600"
  >
    <path
      d="M12.75 16.5C12.75 15.9892 12.5459 15.5002 12.1813 15.1356C11.8167 14.7711 11.3277 14.5669 10.8169 14.5669H6.43313C5.92232 14.5669 5.43331 14.7711 5.06875 15.1356C4.70418 15.5002 4.5 15.9892 4.5 16.5V19.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.625 11.25C10.2918 11.25 11.625 9.91684 11.625 8.25C11.625 6.58316 10.2918 5.25 8.625 5.25C6.95816 5.25 5.625 6.58316 5.625 8.25C5.625 9.91684 6.95816 11.25 8.625 11.25Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.25 5.25H19.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.875 2.625V7.875"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.25 11.25H19.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function EmptyState() {
  const { openForm } = useTasks();
  return (
    <div className="text-center py-16 px-4">
      <EmptyStateIllustration />
      <h3 className="mt-6 text-xl font-bold">No tasks yet</h3>
      <p className="mt-2 text-muted-foreground">
        Ready to conquer your day? Add your first task to get started.
      </p>
      <div className="mt-6">
        <Button onClick={() => openForm()} size="lg" className="rounded-full">
          <PlusCircle className="mr-2 h-5 w-5" />
          Create First Task
        </Button>
      </div>
    </div>
  );
}
