'use client';

import type { Task } from '@/lib/types';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import confetti from 'canvas-confetti';

export type View = 'Home' | 'Tasks' | 'Stats' | 'Profile';

interface TasksContextType {
  tasks: Task[];
  isLoaded: boolean;
  addTask: (task: Omit<Task, 'id' | 'completedAt'>) => Task;
  updateTask: (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => void;
  deleteTask: (id: string) => void;
  deleteMultipleTasks: (ids: string[]) => void;
  getTaskById: (id: string) => Task | undefined;

  isFormOpen: boolean;
  editingTask: Task | null;
  openForm: (task?: Task | null) => void;
  closeForm: () => void;

  activeView: View;
  setActiveView: (view: View) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeView, setActiveView] = useState<View>('Home');

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('herotask-tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Failed to parse tasks from localStorage', error);
      setTasks([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('herotask-tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks to localStorage', error);
      }
    }
  }, [tasks, isLoaded]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'completedAt'>) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...task,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTask = useCallback(
    (id: string, updatedTask: Partial<Omit<Task, 'id'>>) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id === id) {
            const wasCompleted = task.status === 'Completed';
            const isNowCompleted = updatedTask.status === 'Completed';

            const newValues = { ...task, ...updatedTask };

            if (!wasCompleted && isNowCompleted) {
              newValues.completedAt = new Date().toISOString();
              confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                angle: 90,
              });
            } else if (
              wasCompleted &&
              updatedTask.status &&
              updatedTask.status !== 'Completed'
            ) {
              newValues.completedAt = undefined;
            }

            return newValues;
          }
          return task;
        })
      );
    },
    []
  );

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const deleteMultipleTasks = useCallback((ids: string[]) => {
    setTasks((prev) => prev.filter((task) => !ids.includes(task.id)));
  }, []);

  const getTaskById = useCallback(
    (id: string) => {
      return tasks.find((task) => task.id === id);
    },
    [tasks]
  );

  const openForm = useCallback((task: Task | null = null) => {
    setEditingTask(task);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingTask(null);
  }, []);

  const value = {
    tasks,
    isLoaded,
    addTask,
    updateTask,
    deleteTask,
    deleteMultipleTasks,
    getTaskById,
    isFormOpen,
    editingTask,
    openForm,
    closeForm,
    activeView,
    setActiveView,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};
