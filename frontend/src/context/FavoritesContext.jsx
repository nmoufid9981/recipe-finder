import { createContext, useState, useCallback } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext(null);

const FAVORITES_KEY = "favoriteRecipes";

const getRecipeId = (recipe) => {
  if (!recipe) return null;
  return recipe.id || recipe.recipeId || recipe.idMeal;
};

const normalizeRecipe = (recipe) => {
  const id = getRecipeId(recipe);

  return {
    ...recipe,
    id: id ? String(id) : null,
    title: recipe.title || recipe.name || recipe.strMeal,
    image: recipe.image || recipe.strMealThumb,
    description: recipe.description || "",
    level: recipe.level || "Easy",
    match: recipe.match || 80,
    rating: recipe.rating || 4.5,
    time: recipe.time || "30 min",
    people: recipe.people || 2,
    type: recipe.type || recipe.strCategory || "",
    ingredients: recipe.ingredients || [],
    tags: recipe.tags || [],
    instructions:
      recipe.instructions || recipe.strInstructions || "No instructions available",
  };
};

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    const recipes = saved ? JSON.parse(saved) : [];
    return recipes.map(normalizeRecipe).filter((recipe) => recipe.id);
  } catch (err) {
    console.error("Failed to load favorites:", err);
    return [];
  }
};

const saveFavorites = (recipes) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(recipes));
};

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => loadFavorites());
  const [favoriteIds, setFavoriteIds] = useState(
    () => new Set(loadFavorites().map((recipe) => String(recipe.id)))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshState = useCallback((nextFavorites) => {
    saveFavorites(nextFavorites);
    setFavorites(nextFavorites);
    setFavoriteIds(new Set(nextFavorites.map((recipe) => String(recipe.id))));
  }, []);

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const savedFavorites = loadFavorites();
      refreshState(savedFavorites);
      return savedFavorites;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching favorites:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [refreshState]);

  const addToFavorites = useCallback(
    async (recipe) => {
      const normalizedRecipe = normalizeRecipe(recipe);

      if (!normalizedRecipe.id) {
        setError("Recipe ID not found");
        return false;
      }

      const exists = favorites.some(
        (item) => String(item.id) === String(normalizedRecipe.id)
      );

      if (exists) return true;

      const nextFavorites = [...favorites, normalizedRecipe];
      refreshState(nextFavorites);

      return true;
    },
    [favorites, refreshState]
  );

  const removeFromFavorites = useCallback(
    async (recipeId) => {
      const normalizedRecipeId = String(recipeId);

      const nextFavorites = favorites.filter(
        (recipe) => String(recipe.id) !== normalizedRecipeId
      );

      refreshState(nextFavorites);

      return true;
    },
    [favorites, refreshState]
  );

  const isFavorite = useCallback(
    (recipeId) => {
      if (!recipeId) return false;
      return favoriteIds.has(String(recipeId));
    },
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    async (recipe) => {
      const recipeId = getRecipeId(recipe);

      if (!recipeId) {
        setError("Recipe ID not found");
        return false;
      }

      if (isFavorite(recipeId)) {
        return removeFromFavorites(recipeId);
      }

      return addToFavorites(recipe);
    },
    [isFavorite, removeFromFavorites, addToFavorites]
  );

  const clearFavorites = useCallback(() => {
    refreshState([]);
    setError(null);
  }, [refreshState]);

  const value = {
    favorites,
    favoriteIds,
    loading,
    error,
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
