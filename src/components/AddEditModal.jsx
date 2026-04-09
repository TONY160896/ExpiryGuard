import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CATEGORIES = ['Food', 'Medicine', 'Cosmetics', 'Pantry', 'Other'];

export default function AddEditModal({ isOpen, onClose, onSave, itemToEdit }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setCategory(itemToEdit.category);
      setExpiryDate(itemToEdit.expiryDate);
      setQuantity(itemToEdit.quantity || 1);
      setNotes(itemToEdit.notes || '');
    } else {
      setName('');
      setCategory(CATEGORIES[0]);
      setExpiryDate('');
      setQuantity(1);
      setNotes('');
    }
  }, [itemToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !expiryDate) return;
    
    onSave({
      ...(itemToEdit ? { id: itemToEdit.id } : {}),
      name,
      category,
      expiryDate,
      quantity,
      notes,
      addedAt: itemToEdit ? itemToEdit.addedAt : new Date().toISOString()
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[var(--color-oled-card)] border border-[var(--color-oled-border)] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-[var(--color-oled-border)]">
                <h3 className="text-xl font-semibold text-gray-900">
                  {itemToEdit ? 'Edit Item' : 'Add Item'}
                </h3>
                <button 
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Item Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[var(--color-oled-border)] rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--color-brand-light)] focus:ring-1 focus:ring-[var(--color-brand-light)] transition-colors"
                    placeholder="e.g., Milk"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-[var(--color-oled-border)] rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--color-brand-light)] transition-colors appearance-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-white border border-[var(--color-oled-border)] rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--color-brand-light)] transition-colors style-scheme-light"
                    style={{ colorScheme: 'light' }}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full bg-white border border-[var(--color-oled-border)] rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--color-brand-light)] transition-colors"
                    />
                  </div>
                  <div className="w-2/3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Notes (Optional)</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-white border border-[var(--color-oled-border)] rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[var(--color-brand-light)] transition-colors"
                      placeholder="e.g., Use before baking"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[var(--color-brand-light)] hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-black/10"
                  >
                    {itemToEdit ? 'Save Changes' : 'Add to Inventory'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
