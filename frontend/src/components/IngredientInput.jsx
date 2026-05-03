import { useState } from "react";

export default function IngredientInput({ onChange }) {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    const value = input.trim().toLowerCase();
    if (!value) return;

    // empêcher doublons
    if (ingredients.includes(value)) {
      setInput("");
      return;
    }

    const updated = [...ingredients, value];
    setIngredients(updated);
    onChange(updated);
    setInput("");
  };

  const removeIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
    onChange(updated);
  };

  const clearAll = () => {
    setIngredients([]);
    onChange([]);
  };

  return (
  <div className="max-w-xl mx-auto">

    {/* INPUT CARD */}
    <div className="bg-white p-4 rounded-2xl shadow flex gap-2">

      <input
            className="flex-1 outline-none px-3"
            placeholder="Ex: tomato, chicken..."
            value={input}
            onChange={(e) => setInput(e.target.value)}

            // 🔥 AJOUT ICI
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addIngredient();
              }
            }}
      />
      <button
        onClick={addIngredient}
        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition"
      >
        Add
      </button>

    </div>

    {/* TAGS */}
    <div className="flex flex-wrap gap-2 mt-4 justify-center">
      {ingredients.map((item, index) => (
        <div
          key={index}
          className="bg-orange-50 text-orange-600 px-4 py-1 rounded-full flex items-center gap-2 shadow-sm"
        >
          {item}
          <button
            onClick={() => removeIngredient(index)}
            className="text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      ))}
    </div>

    {/* CLEAR */}
    {ingredients.length > 0 && (
      <p
        onClick={clearAll}
        className="text-center text-sm text-gray-400 mt-3 cursor-pointer hover:text-red-500"
      >
        Clear all
      </p>
    )}

  </div>
);
}