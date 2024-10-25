import { useState } from 'react';
import { WordHierarchy } from '../interfaces/hooks/WordHierarchy';

const useWordHierarchy = () => {
  const [hierarchy, setHierarchy] = useState<WordHierarchy>({});
  const [newCategory, setNewCategory] = useState('');
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [newSubcategory, setNewSubcategory] = useState('');
  const [newItem, setNewItem] = useState('');

  const addCategory = () => {
    if (!newCategory.trim()) return;
    setHierarchy((prevHierarchy) => ({
      ...prevHierarchy,
      [newCategory]: {},
    }));
    setNewCategory('');
    setCurrentCategory(newCategory);
  };

  const addSubcategory = () => {
    if (!newSubcategory.trim() || !currentCategory) return;
    setHierarchy((prevHierarchy) => {
      const updatedHierarchy = { ...prevHierarchy };
      updatedHierarchy[currentCategory] = {
        ...updatedHierarchy[currentCategory],
        [newSubcategory]: [],
      };
      return updatedHierarchy;
    });
  };

  const addItem = () => {
    if (!newItem.trim() || !currentCategory || !newSubcategory.trim()) return;
    setHierarchy((prevHierarchy) => {
      const updatedHierarchy = { ...prevHierarchy };
      const categoryNode = updatedHierarchy[currentCategory];

      if (categoryNode && categoryNode[newSubcategory]) {
        const items = categoryNode[newSubcategory];
        if (!items.includes(newItem)) {
          items.push(newItem);
        }
      }
      return updatedHierarchy;
    });
    setNewItem('');
  };

  return {
    hierarchy,
    newCategory,
    setNewCategory,
    currentCategory,
    setCurrentCategory,
    newSubcategory,
    setNewSubcategory,
    newItem,
    setNewItem,
    addCategory,
    addSubcategory,
    addItem,
  };
};

export default useWordHierarchy;
