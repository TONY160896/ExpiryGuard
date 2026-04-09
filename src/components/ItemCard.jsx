import { motion } from 'framer-motion';
import { Calendar, Trash2, Edit2, Apple, Pill, Sparkles, Archive, Tag, AlignLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind class merging
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ItemCard({ item, status, onEdit, onDelete }) {
  const glowColors = {
    expired: 'shadow-[var(--color-expiry-red)]/20 border-l-[var(--color-expiry-red)]',
    urgent: 'shadow-[var(--color-expiry-amber)]/20 border-l-[var(--color-expiry-amber)]',
    safe: 'shadow-[var(--color-expiry-green)]/20 border-l-[var(--color-expiry-green)]',
  };

  const textColors = {
    expired: 'text-[var(--color-expiry-red)]',
    urgent: 'text-[var(--color-expiry-amber)]',
    safe: 'text-[var(--color-expiry-green)]',
  };

  const bgGlows = {
    expired: 'bg-red-500/5',
    urgent: 'bg-amber-500/5',
    safe: 'bg-emerald-500/5',
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(item.expiryDate));

  let timeString = '';
  if (status.days < 0) {
    timeString = `Expired ${Math.abs(status.days)} day${Math.abs(status.days) === 1 ? '' : 's'} ago`;
  } else if (status.days === 0) {
    timeString = 'Expires today';
  } else {
    timeString = `Expires in ${status.days} day${status.days === 1 ? '' : 's'}`;
  }

  const CategoryIcon = {
    'Food': Apple,
    'Medicine': Pill,
    'Cosmetics': Sparkles,
    'Pantry': Archive,
    'Other': Tag
  }[item.category] || Tag;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-[var(--color-oled-card)] border-y border-r border-l-4 border-y-[var(--color-oled-border)] border-r-[var(--color-oled-border)] backdrop-blur-md shadow-lg transition-all",
        glowColors[status.key],
        bgGlows[status.key]
      )}
    >
      <div className="p-5 flex justify-between items-center relative z-10">
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {item.name}
              {item.quantity > 1 && <span className="ml-2 text-sm text-gray-500 font-medium tracking-wide">x{item.quantity}</span>}
            </h3>
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-[var(--color-oled-border)] whitespace-nowrap flex items-center space-x-1.5 focus:outline-none">
              <CategoryIcon className="w-3 h-3 text-[var(--color-brand-light)]" />
              <span>{item.category}</span>
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-4">
              <div className={cn("flex items-center space-x-1.5 text-sm font-medium", textColors[status.key])}>
                <Calendar className="w-4 h-4" />
                <span>{timeString}</span>
              </div>
              <span className="text-xs text-gray-500">{formattedDate}</span>
            </div>
          </div>
          
          {item.notes && (
            <div className="mt-3 flex items-start space-x-2 text-sm text-gray-600 italic bg-gray-50 p-2 rounded-lg border border-[var(--color-oled-border)]">
              <AlignLeft className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
              <p className="line-clamp-2">{item.notes}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(item)}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 rounded-lg transition-colors"
            aria-label="Edit item"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-2 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-[var(--color-expiry-red)] rounded-lg transition-colors"
            aria-label="Delete item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#ffffff03] pointer-events-none" />
    </motion.div>
  );
}
