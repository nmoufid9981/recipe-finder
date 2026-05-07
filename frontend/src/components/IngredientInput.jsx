import { useState } from "react";

export default function IngredientInput({ ingredients, setIngredients, onSearch }) {
  const [input, setInput] = useState("");

  const addIngredient = () => {
    const value = input.trim().toLowerCase();
    if (!value) return;

    if (ingredients.includes(value)) {
      setInput("");
      return;
    }

    const updated = [...ingredients, value];
    setIngredients(updated);
    setInput("");
  };

  const removeIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  const clearAll = () => {
    setIngredients([]);
    onSearch([]); // 🔥 FIX IMPORTANT (clear results)
  };

  const triggerSearch = () => {
    onSearch(ingredients);
  };

  return (
    <div className="max-w-xl mx-auto">

      {/* INPUT CARD */}
      <div className="
        bg-white 
        p-4 
        rounded-2xl 
        shadow-md 
        flex 
        gap-2 
        border 
        border-gray-100
        focus-within:shadow-lg
        transition
      ">

        <input
          className="
            flex-1 
            outline-none 
            px-3 
            py-2
            rounded-xl
            bg-gray-50
            focus:bg-white
            focus:ring-2
            focus:ring-orange-400
            transition
          "
          placeholder="Ex: tomato, chicken..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addIngredient();
              triggerSearch(); // 🔥 FIX
            }
          }}
        />

        <button
          onClick={() => {
            addIngredient();
            triggerSearch(); // 🔥 FIX
          }}
          className="
            bg-orange-500 
            hover:bg-orange-600 
            active:scale-95
            text-white 
            px-5 
            py-2 
            rounded-xl 
            transition
            shadow-md
            hover:shadow-lg
          "
        >
          Add 
        </button>

      </div>

      {/* TAGS */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {ingredients.map((item, index) => (
          <div
            key={index}
            className="
              bg-orange-50 
              text-orange-600 
              px-4 
              py-1 
              rounded-full 
              flex 
              items-center 
              gap-2 
              shadow-sm
              hover:shadow-md
              transition
            "
          >
            {item}
            <button
              onClick={() => removeIngredient(index)}
              className="text-red-400 hover:text-red-600 transition"
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
          className="
            text-center 
            text-sm 
            text-gray-400 
            mt-3 
            cursor-pointer 
            hover:text-red-500 
            transition
          "
        >
          Clear all
        </p>
      )}

    </div>
  );
}