import { useEffect } from "react";
import { useFavorites } from "../hooks/useFavorites";
import RecipeCard from "../components/RecipeCard";
const FavoritesPage = () => {
  const { favorites, loading, error, fetchFavorites } = useFavorites();

  useEffect(() => {
    fetchFavorites();
    // fetchFavorites is included in dependency array but it's wrapped in useCallback in context
  }, [fetchFavorites]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xl text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xl text-red-600">Error loading favorites: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-orange-500 mb-2">
            ❤️ My Favorite Recipes
          </h1>

          <p className="text-gray-600">
            {favorites.length === 0
              ? "No favorite recipes yet. Start adding some!"
              : `You have ${favorites.length} favorite recipe${favorites.length !== 1 ? "s" : ""}`}
          </p>
        </div>
    

        {/* EMPTY STATE */}
        {favorites.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No favorite recipes yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start exploring and click the heart icon to add recipes to your favorites!
            </p>
            <a
              href="/"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
            >
              Browse Recipes
            </a>
          </div>
        ) : (
          // FAVORITES GRID
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;