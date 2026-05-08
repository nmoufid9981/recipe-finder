import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const recipeFromState = location.state?.recipe;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeRecipe = (data) => ({
    id: data.id || data.recipeId || data.idMeal,
    name: data.title || data.name || data.strMeal,
    image: data.image || data.strMealThumb,
    description: data.description || "",
    level: data.level || "Easy",
    rating: data.rating || "4.8",
    time: data.time || "30 min",
    people: data.people || "2",
    type: data.type || "Main dish",
    tags: data.tags || [],
    ingredients: data.ingredients || [],
    instructions:
        data.instructions ||
        data.strInstructions ||
        data.description ||
        "No instructions available",

  });

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);

      if (!id) {
        setError("ID invalide");
        setLoading(false);
        return;
      }

      if (recipeFromState) {
        setRecipe(normalizeRecipe(recipeFromState));
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8082/recipes/${id}`);

        if (!res.ok) {
          throw new Error("Recette introuvable");
        }

        const data = await res.json();
        setRecipe(normalizeRecipe(data));
      } catch (err) {
        console.error(err);
        setError("Recette non trouvée");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id, recipeFromState]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center">
        <p className="text-orange-500 font-semibold text-lg">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fff8f0] flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Recette introuvable
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => navigate("/home")}
            className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Retour aux recettes
          </button>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="min-h-screen bg-[#fff8f0] pb-12">
      <div className="relative h-[420px] w-full overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-white/90 text-gray-900 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-white transition"
        >
          Back
        </button>

        <div className="absolute bottom-8 left-6 right-6 max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {recipe.level}
            </span>
            <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
              {recipe.type}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            {recipe.name}
          </h1>

          <p className="text-white/85 mt-4 max-w-2xl text-base md:text-lg">
            {recipe.description}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <p className="text-gray-400 text-sm">Rating</p>
            <p className="text-xl font-bold text-gray-900">{recipe.rating}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <p className="text-gray-400 text-sm">Time</p>
            <p className="text-xl font-bold text-gray-900">{recipe.time}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <p className="text-gray-400 text-sm">Servings</p>
            <p className="text-xl font-bold text-gray-900">{recipe.people}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <p className="text-gray-400 text-sm">Level</p>
            <p className="text-xl font-bold text-gray-900">{recipe.level}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-[360px_1fr] gap-8">
          <section className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Ingredients
            </h2>

            {recipe.ingredients.length > 0 ? (
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 bg-orange-50 rounded-2xl px-4 py-3 text-gray-700"
                  >
                    <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No ingredients available</p>
            )}
          </section>

          <section className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Instructions
            </h2>

            <div className="bg-[#fff8f0] rounded-2xl p-5 text-gray-700 leading-8 whitespace-pre-line">
              {recipe.instructions}
            </div>

            {recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-6">
                {recipe.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
