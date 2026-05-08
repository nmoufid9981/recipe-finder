import { createContext, useState, useEffect, useCallback } from "react";
import * as api from "../services/api";

// Create and export the context
// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext();

// Provider component
export function FavoritesProvider({ children, userId }) {
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all user favorites from backend
   */
  const fetchFavorites = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    try {
      const recipes = await api.getFavorites(userId);
      setFavorites(recipes);
      
      // Create a Set of favorite IDs for quick lookup
      const ids = new Set(recipes.map(r => r.id));
      setFavoriteIds(ids);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Add a recipe to favorites
   */
  const addToFavorites = useCallback(async (recipe) => {
    try {
      await api.addFavorite(userId, recipe.id);
      
      // Update local state
      setFavorites(prev => [...prev, recipe]);
      setFavoriteIds(prev => new Set([...prev, recipe.id]));
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error adding favorite:", err);
      return false;
    }
  }, [userId]);

  /**
   * Remove a recipe from favorites
   */
  const removeFromFavorites = useCallback(async (recipeId) => {
    try {
      await api.removeFavorite(userId, recipeId);
      
      // Update local state
      setFavorites(prev => prev.filter(r => r.id !== recipeId));
      setFavoriteIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(recipeId);
        return newSet;
      });
      return true;
    } catch (err) {
      setError(err.message);
      console.error("Error removing favorite:", err);
      return false;
    }
  }, [userId]);

  /**
   * Check if a recipe is favorited
   */
  const isFavorite = useCallback((recipeId) => {
    return favoriteIds.has(recipeId);
  }, [favoriteIds]);

  /**
   * Toggle favorite status (add if not favorited, remove if favorited)
   */
  const toggleFavorite = useCallback(async (recipe) => {
    if (isFavorite(recipe.id)) {
      return removeFromFavorites(recipe.id);
    } else {
      return addToFavorites(recipe);
    }
  }, [isFavorite, removeFromFavorites, addToFavorites]);

  /**
   * Clear all favorites (useful for logout)
   */
  const clearFavorites = useCallback(() => {
    setFavorites([]);
    setFavoriteIds(new Set());
    setError(null);
  }, []);

  // Fetch favorites when userId changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (userId) {
      // We use fetchFavorites wrapped in an immediately invoked function to avoid
      // including it in dependency array which would cause infinite loops
      (async () => {
        if (!userId) return;
        
        setLoading(true);
        setError(null);
        try {
          const recipes = await api.getFavorites(userId);
          setFavorites(recipes);
          
          // Create a Set of favorite IDs for quick lookup
          const ids = new Set(recipes.map(r => r.id));
          setFavoriteIds(ids);
        } catch (err) {
          setError(err.message);
          console.error("Error fetching favorites:", err);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setFavorites([]);
      setFavoriteIds(new Set());
      setError(null);
    }
  }, [userId]);

  const value = {
    // State
    favorites,
    favoriteIds,
    loading,
    error,
    
    // Methods
    fetchFavorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
