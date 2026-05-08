import { useState, useEffect } from "react";
import IngredientInput from "../components/IngredientInput";
import RecipeCard from "../components/RecipeCard";
import { searchRecipes } from "../data/recipes";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, [navigate]);

  const handleSearch = async (list = ingredients) => {
    if (!list || list.length === 0) {
      setRecipes([]);
      return;
    }

    try {
      setLoading(true);

      const data = await searchRecipes(list);

      console.log("RECIPES:", data); // 🔥 debug important

      setRecipes(data);
    } catch (err) {
      console.error(err);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="px-6 py-10 min-h-screen flex flex-col">

      <div className="text-center mt-6">
        <h2 className="text-3xl font-bold">
          What’s in your kitchen today?
        </h2>
      </div>

      <div className="mt-16 max-w-2xl mx-auto w-full">
        <IngredientInput
          ingredients={ingredients}
          setIngredients={setIngredients}
          onSearch={handleSearch}
        />
      </div>

      <div className="mt-12 flex-1">

        {loading && (
          <p className="text-center text-gray-500">
            Loading recipes...
          </p>
        )}

        {!loading && recipes.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            Add ingredients to start 🍳
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {recipes.map((r, index) => (
              <RecipeCard key={r.id || r.idMeal || index} recipe={r} />
            ))}
          </div>
        )}

      </div>

    </motion.div>
  );
}