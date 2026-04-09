import { useState, useEffect } from 'react';
import { differenceInDays, startOfDay, parseISO } from 'date-fns';

export function useInventory() {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('expiryguard-items');
    return stored ? JSON.parse(stored) : [];
  });

  // Sync with local storage
  useEffect(() => {
    localStorage.setItem('expiryguard-items', JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    const newItem = {
      id: crypto.randomUUID(),
      ...item,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const updateItem = (updatedItem) => {
    setItems((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getStatus = (expiryDate) => {
    const today = startOfDay(new Date());
    const expiry = startOfDay(parseISO(expiryDate));
    const days = differenceInDays(expiry, today);

    if (days < 0) return { label: 'Expired', key: 'expired', days };
    if (days >= 0 && days <= 7) return { label: 'Urgent', key: 'urgent', days };
    return { label: 'Safe', key: 'safe', days };
  };

  // Sort: Expired -> Urgent -> Safe. Within categories, sort by days remaining ascending
  const sortedItems = [...items].sort((a, b) => {
    const statusA = getStatus(a.expiryDate);
    const statusB = getStatus(b.expiryDate);
    
    const rank = { expired: 0, urgent: 1, safe: 2 };
    if (rank[statusA.key] !== rank[statusB.key]) {
      return rank[statusA.key] - rank[statusB.key];
    }
    
    return statusA.days - statusB.days;
  });

  return {
    items: sortedItems,
    addItem,
    updateItem,
    removeItem,
    getStatus,
  };
}
