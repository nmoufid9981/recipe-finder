const API_BASE = "http://localhost:8082";

// 🔎 Search recipes
export const searchRecipes = (ingredients = []) => {
  const query = Array.isArray(ingredients)
    ? ingredients.join(",")
    : ingredients;

  return fetch(`${API_BASE}/recipes/search?ingredients=${encodeURIComponent(query)}`)
    .then(res => {
      if (!res.ok) throw new Error("Search failed");
      return res.json();
    });
};

// 📋 Get all recipes
export const getAllRecipes = () => {
  return fetch(`${API_BASE}/recipes`)
    .then(res => {
      if (!res.ok) throw new Error("Fetch recipes failed");
      return res.json();
    });
};

// 🔍 Get recipe by ID
export const getRecipeById = (id) => {
  return fetch(`${API_BASE}/recipes/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Recipe not found");
      return res.json();
    });
};

// 👤 Register
export const registerUser = (userData) => {
  return fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  }).then(res => {
    if (!res.ok) throw new Error("Register failed");
    return res.json();
  });
};

// 🔐 Login
export const loginUser = (loginData) => {
  return fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  }).then(res => {
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  });
};