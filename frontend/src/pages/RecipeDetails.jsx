import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8082/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("404");
        return res.json();
      })
      .then((data) => setRecipe(data))
      .catch(() => setError("Recette non trouvée"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Chargement...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* IMAGE HEADER */}
        <div className="relative h-72 md:h-96">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />

          {/* overlays like your card */}
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm shadow">
            {recipe.difficulty || "Easy"}
          </div>

          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm shadow">
            {recipe.match || "85% match"}
          </div>

          <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm shadow flex items-center gap-1">
            ⭐ {recipe.rating || "4.5"}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-10">

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-orange-500 mb-2">
            {recipe.name}
          </h1>

          <p className="text-gray-500 mb-6">
            {recipe.description || "Delicious recipe made with love"}
          </p>

          {/* INFO ROW */}
          <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              ⏱ <span>30 min</span>
            </div>
            <div className="flex items-center gap-2">
              👥 <span>2 persons</span>
            </div>
            <div className="flex items-center gap-2">
              🍽 <span>Dinner</span>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* INGREDIENTS */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                🥕 Ingredients
              </h2>

              <div className="bg-orange-50 p-4 rounded-2xl space-y-2">
                {Array.isArray(recipe.ingredients)
                  ? recipe.ingredients.map((ing, i) => (
                      <div
                        key={i}
                        className="bg-white px-3 py-2 rounded-lg shadow-sm"
                      >
                        {ing}
                      </div>
                    ))
                  : <p>{recipe.ingredients}</p>}
              </div>

              {/* missing ingredients like your card */}
              <div className="mt-4 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm inline-block">
                ⚠️ Il vous manque ingrédients
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                👨‍🍳 Instructions
              </h2>

              <div className="bg-gray-50 p-4 rounded-2xl space-y-3 leading-relaxed text-gray-700">
                {recipe.instructions}
              </div>
            </div>

          </div>

          {/* TAGS */}
          <div className="mt-8 flex gap-2 flex-wrap">
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
              quick
            </span>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
              healthy
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}