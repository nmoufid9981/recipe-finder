export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      <img
        src={recipe.image}
        className="h-32 w-full object-cover"
        alt={recipe.title}
      />

      <div className="p-3">
        <h3 className="font-semibold">{recipe.title}</h3>
        <p className="text-gray-500 text-sm">⏱ {recipe.time}</p>
      </div>

    </div>
  );
}