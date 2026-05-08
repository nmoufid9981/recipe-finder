import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

/**
 * Hook to use the Favorites context
 * Must be used within a FavoritesProvider
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}
