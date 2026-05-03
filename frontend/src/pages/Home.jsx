import IngredientInput from "../components/IngredientInput";
import RecipeCard from "../components/RecipeCard";
import { recipes } from "../data/recipes";

export default function Home() {
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

      {/* INPUT INGREDIENTS */}
      <IngredientInput />

      {/* RECIPES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>

    </div>
  );
}