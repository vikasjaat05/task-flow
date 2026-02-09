'use client';
import { TaskCard } from './task-card';
import { EmptyState } from './empty-state';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/lib/types';

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div key={task.id} variants={itemVariants} layout>
            <TaskCard task={task} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
