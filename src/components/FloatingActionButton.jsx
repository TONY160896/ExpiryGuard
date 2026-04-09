import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function FloatingActionButton({ onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 md:right-8 md:bottom-8 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:bg-indigo-700 transition-all z-50"
      aria-label="Add new item"
    >
      <Plus className="w-6 h-6" />
    </motion.button>
  );
}
