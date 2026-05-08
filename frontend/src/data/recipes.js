export const searchRecipes = async (ingredients) => {
  if (!ingredients || ingredients.length === 0) return [];

  const query = ingredients.join(",");

  const res = await fetch(
    `http://localhost:8082/api/external/meals?query=${query}`
  );

  const data = await res.json();

  const meals = data.meals || [];

  return meals.map((meal) => ({
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,

    description: meal.strInstructions
      ? meal.strInstructions.slice(0, 120) + "..."
      : "No description available",

    instructions: meal.strInstructions || "No instructions available",

    level: "Easy",
    match: 80,
    rating: 4.5,
    time: "30 min",
    people: 2,
    type: meal.strCategory,

    ingredients: extractIngredients(meal),

    tags: meal.strTags ? meal.strTags.split(",") : [],
  }));
};

function extractIngredients(meal) {
  const list = [];

  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ing && ing.trim() !== "") {
      list.push(`${measure ? measure.trim() : ""} ${ing.trim()}`.trim());
    }
  }

  return list;
}
