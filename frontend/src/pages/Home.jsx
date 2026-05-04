import { useState, useEffect } from "react";
import IngredientInput from "../components/IngredientInput";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);

  // 🔥 fetch backend
  useEffect(() => {
    fetch("http://localhost:8082/recipes")
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.log(err));
  }, []);

  // 🔥 filter
  const filteredRecipes = recipes.filter((recipe) =>
    ingredients.every((ing) =>
      recipe.ingredients?.includes(ing)
    )
  );

  return (
    <div className="px-6 py-10">

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          Qu'avez-vous dans votre cuisine ?
        </h2>
      </div>

      <IngredientInput onChange={setIngredients} />

      <div className="mt-10">

        {ingredients.length === 0 ? (
          <p className="text-center text-gray-500">
            Ajoutez des ingrédients
          </p>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Aucune recette trouvée
          </p>
        )}

      </div>
    </div>
  );
}