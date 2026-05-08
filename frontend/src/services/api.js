const API_BASE = "http://localhost:8082";

/* =========================
   🔎 SEARCH RECIPES
========================= */
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

/* =========================
   📋 GET ALL RECIPES
========================= */
export const getAllRecipes = () => {
  return fetch(`${API_BASE}/recipes`)
    .then(res => {
      if (!res.ok) throw new Error("Fetch recipes failed");
      return res.json();
    });
};

/* =========================
   🔍 GET RECIPE BY ID
========================= */
export const getRecipeById = (id) => {
  return fetch(`${API_BASE}/recipes/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Recipe not found");
      return res.json();
    });
};

/* =========================
   👤 AUTH
========================= */
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
// ❤️ FAVORITES ENDPOINTS

// Get all favorite recipes for a user
export const getFavorites = (userId) => {
  return fetch(`${API_BASE}/api/favorites/user/${userId}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch favorites");
      return res.json();
    });
};

// Add a recipe to favorites
export const addFavorite = (userId, recipeId) => {
  return fetch(
    `${API_BASE}/api/favorites/user/${userId}/recipe/${recipeId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then(res => {
    if (!res.ok) throw new Error("Failed to add favorite");
    return res.json();
  });
};

// Remove a recipe from favorites
export const removeFavorite = (userId, recipeId) => {
  return fetch(
    `${API_BASE}/api/favorites/user/${userId}/recipe/${recipeId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then(res => {
    if (!res.ok) throw new Error("Failed to remove favorite");
      return res.json();
  });
};

// Toggle favorite status
export const toggleFavorite = (userId, recipeId) => {
  return fetch(
    `${API_BASE}/api/favorites/user/${userId}/recipe/${recipeId}/toggle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then(res => {
    if (!res.ok) throw new Error("Failed to toggle favorite");
    return res.json();
  });
};

// Check if recipe is favorite
export const checkIsFavorite = (userId, recipeId) => {
  return fetch(
    `${API_BASE}/api/favorites/user/${userId}/recipe/${recipeId}`
  ).then(res => {
    if (!res.ok) throw new Error("Failed to check favorite");
    return res.json();
  });
};

// Get favorite count
export const getFavoriteCount = (recipeId) => {
  return fetch(`${API_BASE}/api/favorites/count/${recipeId}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to get favorite count");
      return res.json();
    });
};