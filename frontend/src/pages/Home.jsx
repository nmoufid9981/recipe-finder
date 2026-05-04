import { useState } from "react";
import IngredientInput from "../components/IngredientInput";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  // 🔥 CALL BACKEND
  const handleSearch = async (ings) => {
    if (!ings || ings.length === 0) {
      setRecipes([]);
      return;
    }

    const query = ings.join(",");

    try {
      const res = await fetch(
        `http://localhost:8082/recipes/search?ingredients=${query}`
      );

      if (!res.ok) {
        throw new Error("Erreur backend");
      }

      const data = await res.json();
      setRecipes(data);
    } catch (error) {
      console.error("Erreur fetch:", error);
      setRecipes([]);
    }
  };

  return (
    <div className="px-6 py-10">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center mb-8">
        Qu'avez-vous dans votre cuisine ?
      </h2>

      {/* INPUT INGREDIENTS */}
      <IngredientInput
        onChange={(ings) => {
          setIngredients(ings);   // stock local
          handleSearch(ings);     // appel backend
        }}
      />

      {/* RESULTS */}
      <div className="mt-10">

        {recipes.length === 0 ? (
          <p className="text-center text-gray-500">
            Aucune recette trouvée
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}