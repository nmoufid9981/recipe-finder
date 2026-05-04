import { useState } from "react";
import IngredientInput from "../components/IngredientInput";
import RecipeCard from "../components/RecipeCard";
import { recipes } from "../data/recipes";

export default function Home() {
  const [ingredients, setIngredients] = useState([]);

  const filteredRecipes = recipes.filter((recipe) =>
    ingredients.every((ing) =>
      recipe.ingredients.includes(ing)
    )
  );

  return (
    <div className="px-6 py-10">

      {/* HERO */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          Qu'avez-vous dans votre cuisine ?
        </h2>
        <p className="text-gray-500 mt-2">
          Ajoutez vos ingrédients et découvrez des recettes délicieuses
        </p>
      </div>

      {/* INPUT */}
      <IngredientInput onChange={setIngredients} />

      {/* RESULT */}
      <div className="mt-10">

        {ingredients.length === 0 ? (
          <p className="text-center text-gray-500">
            Aucun ingrédient ajouté. Commencez à taper ci-dessus pour ajouter des ingrédients.
          </p>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRecipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Aucune recette trouvée avec ces ingrédients.
          </p>
        )}

      </div>

    </div>
  );
}