'use client';

import { useTasks } from '@/contexts/tasks-context';
import { TaskDashboard } from '@/components/task-dashboard';
import { StatsView } from '@/components/stats-view';
import { ProfileView } from '@/components/profile-view';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const { activeView } = useTasks();

  const renderView = () => {
    switch (activeView) {
      case 'Home':
      case 'Tasks':
        return <TaskDashboard />;
      case 'Stats':
        return <StatsView />;
      case 'Profile':
        return <ProfileView />;
      default:
        return <TaskDashboard />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.2 }}
      >
        {renderView()}
      </motion.div>
    </AnimatePresence>
  );
}
