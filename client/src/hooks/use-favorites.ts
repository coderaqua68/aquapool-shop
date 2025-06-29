import { useState, useEffect } from "react";

export interface FavoriteItem {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  slug?: string;
}

const FAVORITES_STORAGE_KEY = "aquapool-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
      }
    }
  }, []);

  const addToFavorites = (item: FavoriteItem) => {
    const newFavorites = [...favorites, item];
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (id: number) => {
    const newFavorites = favorites.filter(item => item.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
      return false;
    } else {
      addToFavorites(item);
      return true;
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some(item => item.id === id);
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem(FAVORITES_STORAGE_KEY);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    getFavoritesCount,
  };
}