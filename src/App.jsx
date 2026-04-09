import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInventory } from './hooks/useInventory';
import BentoDashboard from './components/BentoDashboard';
import ItemCard from './components/ItemCard';
import AddEditModal from './components/AddEditModal';
import EmptyState from './components/EmptyState';
import FloatingActionButton from './components/FloatingActionButton';
import { Clock } from 'lucide-react';

function App() {
  const { items, addItem, updateItem, removeItem, getStatus } = useInventory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleOpenModal = (item = null) => {
    setItemToEdit(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setItemToEdit(null);
    setIsModalOpen(false);
  };

  const handleSaveItem = (item) => {
    if (item.id) {
      updateItem(item);
    } else {
      addItem(item);
    }
  };

  // Calculate stats for BentoDashboard
  const totalItems = items.length;
  const urgentCount = items.filter(item => {
    const status = getStatus(item.expiryDate);
    // Action Needed is specifically < 3 days as per requirements string
    return status.days >= 0 && status.days < 3;
  }).length;
  const expiredCount = items.filter(item => getStatus(item.expiryDate).days < 0).length;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#f9fafb]/80 backdrop-blur-xl border-b border-[var(--color-oled-border)] p-4 md:p-6 mb-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[var(--color-brand-light)] rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                ExpiryGuard
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Local Inventory</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6">
        <BentoDashboard 
          totalItems={totalItems}
          urgentCount={urgentCount}
          expiredCount={expiredCount}
        />

        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <ItemCard 
                  key={item.id}
                  item={item}
                  status={getStatus(item.expiryDate)}
                  onEdit={handleOpenModal}
                  onDelete={removeItem}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <FloatingActionButton onClick={() => handleOpenModal()} />

      <AddEditModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveItem}
        itemToEdit={itemToEdit}
      />
    </div>
  );
}

export default App;
