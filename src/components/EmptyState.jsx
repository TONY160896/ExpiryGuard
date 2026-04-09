import { motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-[50vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-20 h-20 bg-[var(--color-oled-card)] border border-[var(--color-oled-border)] rounded-2xl flex items-center justify-center mb-6 shadow-xl mx-auto">
          <PackageOpen className="w-10 h-10 text-[var(--color-brand-light)]" />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Inventory is Empty</h2>
        <p className="text-gray-500 max-w-sm">
          No items being tracked yet. Tap the + icon to start adding items to ExpiryGuard.
        </p>
      </motion.div>
    </div>
  );
}
