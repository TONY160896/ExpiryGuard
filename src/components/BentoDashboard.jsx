import { motion } from 'framer-motion';
import { Package, AlertTriangle, AlertCircle } from 'lucide-react';

export default function BentoDashboard({ totalItems, urgentCount, expiredCount }) {
  const cards = [
    {
      title: 'Total Inventory',
      value: totalItems,
      icon: Package,
      color: 'text-slate-800',
      bgGlow: 'bg-slate-200/50',
      border: 'border-slate-300',
      iconBg: 'bg-slate-100'
    },
    {
      title: 'Action Needed',
      value: urgentCount,
      icon: AlertCircle,
      color: 'text-[var(--color-expiry-amber)]',
      bgGlow: 'bg-amber-500/10',
      border: 'border-amber-200',
      iconBg: 'bg-amber-50'
    },
    {
      title: 'Wasted/Expired',
      value: expiredCount,
      icon: AlertTriangle,
      color: 'text-[var(--color-expiry-red)]',
      bgGlow: 'bg-red-500/10',
      border: 'border-red-200',
      iconBg: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`p-5 rounded-2xl bg-[var(--color-oled-card)] border border-[var(--color-oled-border)] relative overflow-hidden group`}
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl ${card.bgGlow} transition-transform group-hover:scale-150`} />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-gray-600">{card.title}</span>
                <div className={`p-2 rounded-xl ${card.iconBg} border ${card.border}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
              <div className="flex items-baseline space-x-2">
                <h2 className={`text-4xl font-bold ${card.color}`}>{card.value}</h2>
                {card.title === 'Action Needed' && <span className="text-xs text-gray-500 uppercase tracking-wider">&lt; 3 days</span>}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
