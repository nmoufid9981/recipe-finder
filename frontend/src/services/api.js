const API_BASE = "http://localhost:8082";

// 🔎 Search recipes
export const searchRecipes = (ingredients) => {
  return fetch(
    `${API_BASE}/recipes/search?ingredients=${ingredients.join(",")}`
  ).then(res => res.json());
};

// 📋 Get all recipes
export const getAllRecipes = () => {
  return fetch(`${API_BASE}/recipes`).then(res => res.json());
};

// 🔍 Get recipe by ID (IMPORTANT - AJOUTÉ)
export const getRecipeById = (id) => {
  return fetch(`${API_BASE}/recipes/${id}`)
    .then(res => res.json());
};

// 👤 Register
export const registerUser = (userData) => {
  return fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  }).then(res => res.json());
};

// 🔐 Login
export const loginUser = (loginData) => {
  return fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  }).then(res => res.json());
};