package com.recipefinder.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipefinder.backend.dto.RecipeDTO;
import com.recipefinder.backend.model.Favorite;
import com.recipefinder.backend.model.Recipe;
import com.recipefinder.backend.model.User;
import com.recipefinder.backend.repository.FavoriteRepository;
import com.recipefinder.backend.repository.RecipeRepository;
import com.recipefinder.backend.repository.UserRepository;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    /**
     * Add a recipe to user's favorites
     * Prevents duplicate favorites
     */
    public void addFavorite(Long userId, Long recipeId) {
        // Check if already favorited
        if (favoriteRepository.existsByUserIdAndRecipeId(userId, recipeId)) {
            throw new IllegalArgumentException("Recipe already in favorites");
        }

        // Get user and recipe
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Recipe recipe = recipeRepository.findById(recipeId)
            .orElseThrow(() -> new RuntimeException("Recipe not found"));

        // Create and save favorite
        Favorite favorite = Favorite.builder()
            .user(user)
            .recipe(recipe)
            .build();

        favoriteRepository.save(favorite);
    }

    /**
     * Remove a recipe from user's favorites
     * Now uses userId consistently
     */
    public void removeFavorite(Long userId, Long recipeId) {
        Favorite favorite = favoriteRepository
            .findByUserIdAndRecipeId(userId, recipeId)
            .orElseThrow(() -> new RuntimeException("Favorite not found"));

        favoriteRepository.delete(favorite);
    }

    /**
     * Toggle favorite status (add if not favorited, remove if favorited)
     */
    public boolean toggleFavorite(Long userId, Long recipeId) {
        if (favoriteRepository.existsByUserIdAndRecipeId(userId, recipeId)) {
            removeFavorite(userId, recipeId);
            return false; // Now not favorited
        } else {
            addFavorite(userId, recipeId);
            return true; // Now favorited
        }
    }

    /**
     * Get all favorite recipes for a user as DTOs (avoids lazy loading)
     */
    public List<RecipeDTO> getFavoriteRecipes(Long userId) {
        return favoriteRepository.findByUserId(userId)
            .stream()
            .map(favorite -> convertRecipeToDTO(favorite.getRecipe()))
            .collect(Collectors.toList());
    }

    /**
     * Get all favorites for a user (with full Favorite objects)
     */
    public List<Favorite> getFavorites(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    /**
     * Check if a recipe is favorited by a user
     */
    public boolean isFavorite(Long userId, Long recipeId) {
        return favoriteRepository.existsByUserIdAndRecipeId(userId, recipeId);
    }

    /**
     * Get count of users who favorited a recipe
     */
    public long getFavoriteCount(Long recipeId) {
        return favoriteRepository.countByRecipeId(recipeId);
    }

    /**
     * Convert Recipe entity to RecipeDTO to avoid lazy loading issues
     */
    private RecipeDTO convertRecipeToDTO(Recipe recipe) {
        return RecipeDTO.builder()
            .id(recipe.getId())
            .title(recipe.getTitle())
            .description(recipe.getDescription())
            .image(recipe.getImage())
            .level(recipe.getLevel())
            .rating(recipe.getRating())
            .time(recipe.getTime())
            .people(recipe.getPeople())
            .type(recipe.getType())
            .tags(recipe.getTags())
            .ingredients(recipe.getIngredients())
            .build();
    }
}

