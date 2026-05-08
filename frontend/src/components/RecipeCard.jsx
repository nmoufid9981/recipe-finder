import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, loading } = useFavorites();

  const recipeId = recipe.id || recipe.recipeId || recipe.idMeal;
  const normalizedRecipeId = recipeId ? String(recipeId) : null;

  const isFav = isFavorite(normalizedRecipeId);

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();

    if (!normalizedRecipeId) {
      console.error("ID recette introuvable:", recipe);
      return;
    }

    await toggleFavorite({
      ...recipe,
      id: normalizedRecipeId,
    });
  };

  const handleClick = () => {
    if (!normalizedRecipeId) return;

    navigate(`/recipes/${normalizedRecipeId}`, {
      state: {
        recipe: {
          ...recipe,
          id: normalizedRecipeId,
        },
      },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition overflow-hidden"
    >
      <div className="relative">
        <img
          src={recipe.image}
          className="h-48 w-full object-cover"
          alt={recipe.title || recipe.name}
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm">
          {recipe.level || "Easy"}
        </span>

        <span className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm">
          {recipe.match || 90}% match
        </span>

        <span className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full text-sm">
          ⭐ {recipe.rating || "4.8"}
        </span>

        <button
            type="button"
            onClick={handleToggleFavorite}
            disabled={loading}
            className={`absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full text-sm transition ${
              isFav ? "bg-red-500 text-white" : "bg-white text-gray-800"
            }`}
          >
            {isFav ? "❤️" : "🤍"}
          </button>

      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-orange-500">
          {recipe.title || recipe.name || recipe.strMeal}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {recipe.description}
        </p>
      </div>
    </div>
  );
}
