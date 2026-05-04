const API_BASE = "http://localhost:8082";

export const searchRecipes = (ingredients) => {
  return fetch(
    `${API_BASE}/recipes/search?ingredients=${ingredients.join(",")}`
  ).then(res => res.json());
};

export const getAllRecipes = () => {
  return fetch(`${API_BASE}/recipes`).then(res => res.json());
};