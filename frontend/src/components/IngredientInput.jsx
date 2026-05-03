import { useState } from "react";

export default function IngredientInput() {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  // ➕ Ajouter ingrédient
  const addIngredient = () => {
    if (!input.trim()) return;

    setIngredients([...ingredients, input]);
    setInput("");
  };

  // ❌ Supprimer ingrédient
  const removeIngredient = (indexToRemove) => {
    setIngredients(
      ingredients.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="max-w-xl mx-auto">

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-full px-4 py-2"
          placeholder="Ex: tomato, chicken..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={addIngredient}
          className="bg-orange-500 text-white px-5 py-2 rounded-full"
        >
          Add
        </button>
      </div>

      {/* LISTE INGREDIENTS */}
      <div className="flex flex-wrap gap-2 mt-3">
        {ingredients.map((item, index) => (
          <div
            key={index}
            className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            <span>{item}</span>

            {/* bouton delete */}
            <button
              onClick={() => removeIngredient(index)}
              className="text-red-500 font-bold hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}