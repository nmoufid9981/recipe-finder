import { useState, useEffect } from "react";
import IngredientInput from "../components/IngredientInput";
import RecipeCard from "../components/RecipeCard";
import { searchRecipes } from "../services/api";
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
  }, []);

  const handleSearch = async (list = ingredients) => {
    if (!list || list.length === 0) {
      setRecipes([]); // 🔥 clear UI
      return;
    }

    try {
      setLoading(true);
      const data = await searchRecipes(list);
      setRecipes(data);
    } catch (error) {
      console.error("Search error:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="px-6 py-10 min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >

      {/* HEADER */}
      <div className="text-center mt-6">
        <h2 className="text-3xl font-bold">
          👋 What’s in your kitchen today?
        </h2>
        <p className="text-gray-500 mt-2">
          Turn your ingredients into something delicious 🍝✨
        </p>
      </div>

      {/* INPUT */}
      <div className="mt-16 max-w-2xl mx-auto w-full">
        <IngredientInput
          ingredients={ingredients}
          setIngredients={setIngredients}
          onSearch={handleSearch}
        />
      </div>

      {/* RESULTS */}
      <div className="mt-12 flex-1">

        {loading && (
          <p className="text-center text-gray-500">
            Cooking ideas for you... 👨‍🍳
          </p>
        )}

        {!loading && recipes.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 space-y-2">
            <p>Start by adding ingredients 🥕🥬🍗</p>
            <p className="text-sm">Example: chicken, pasta, tomato</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        )}

      </div>

    </motion.div>
  );
}