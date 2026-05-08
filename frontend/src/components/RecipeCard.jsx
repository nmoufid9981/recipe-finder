import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, loading } = useFavorites();

  // Get the current favorite status
  const isRecipeFavorited = isFavorite(recipe.id);

  const handleToggleFavorite = async (e) => {
    e.stopPropagation(); // Prevent navigation to recipe detail

    // Toggle favorite status
    await toggleFavorite(recipe);
  };

  return (
    <div
      onClick={() => navigate(`/recipes/${recipe.id}`)}
      className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition overflow-hidden"
    >
      {/* IMAGE SECTION */}
      <div className="relative">
        <img
          src={recipe.image}
          className="h-48 w-full object-cover"
          alt={recipe.title}
        />

        <div className="absolute inset-0 bg-black/30"></div>

        {/* DIFFICULTY LEVEL */}
        <span className="absolute top-3 left-3 bg-white text-sm px-3 py-1 rounded-full">
          {recipe.level}
        </span>

        {/* MATCH PERCENTAGE */}
        <span className="absolute top-3 right-3 bg-white text-sm px-3 py-1 rounded-full border">
          {recipe.match}% match
        </span>

        {/* RATING */}
        <span className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full text-sm">
          ⭐ {recipe.rating}
        </span>

        {/* FAVORITE BUTTON */}
        <button
          onClick={handleToggleFavorite}
          disabled={loading}
          className={`absolute bottom-3 right-3 px-3 py-1 rounded-full text-sm transition-all ${
            isRecipeFavorited
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-white hover:bg-red-50"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          title={isRecipeFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          {isRecipeFavorited ? "❤️" : "🤍"}
        </button>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-orange-500">{recipe.title}</h3>

        <p className="text-gray-500 text-sm mt-1">{recipe.description}</p>

        {/* RECIPE INFO */}
        <div className="flex gap-4 text-sm text-gray-500 mt-3">
          <span>⏱ {recipe.time}</span>
          <span>👥 {recipe.people}</span>
          <span>🍽 {recipe.type}</span>
        </div>

        {/* MISSING INGREDIENTS */}
        <div className="mt-4 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm">
          Il vous manque {recipe.missing} ingrédients
        </div>

        {/* TAGS */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {recipe.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
