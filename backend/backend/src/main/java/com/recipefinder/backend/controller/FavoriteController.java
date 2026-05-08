package com.recipefinder.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recipefinder.backend.dto.RecipeDTO;
import com.recipefinder.backend.service.FavoriteService;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    // Get all favorites
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RecipeDTO>> getFavorites(@PathVariable Long userId) {
        try {
            List<RecipeDTO> favorites = favoriteService.getFavoriteRecipes(userId);
            return ResponseEntity.ok(favorites);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Add favorite
    @PostMapping("/user/{userId}/recipe/{recipeId}")
    public ResponseEntity<?> addFavorite(
            @PathVariable Long userId,
            @PathVariable Long recipeId) {

        try {
            favoriteService.addFavorite(userId, recipeId);
            return ResponseEntity.ok(
                Map.of("message", "Added to favorites")
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity.badRequest().body(
                Map.of("error", "Already in favorites")
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    // Remove favorite
    @DeleteMapping("/user/{userId}/recipe/{recipeId}")
    public ResponseEntity<?> removeFavorite(
            @PathVariable Long userId,
            @PathVariable Long recipeId) {

        try {
            favoriteService.removeFavorite(userId, recipeId);

            return ResponseEntity.ok(
                Map.of("message", "Removed from favorites")
            );

        } catch (RuntimeException e) {

            return ResponseEntity
        .badRequest()
        .body(Map.of("error", "Favorite not found"));
        }
    }

    // Check if favorite
    @GetMapping("/user/{userId}/recipe/{recipeId}")
    public ResponseEntity<Map<String, Boolean>> isFavorite(
            @PathVariable Long userId,
            @PathVariable Long recipeId) {

        try {
            boolean isFavorited = favoriteService.isFavorite(userId, recipeId);

            return ResponseEntity.ok(
                Map.of("isFavorited", isFavorited)
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest().build();
        }
    }

    // Favorite count
    @GetMapping("/count/{recipeId}")
    public ResponseEntity<Map<String, Long>> getFavoriteCount(
            @PathVariable Long recipeId) {

        try {
            long count = favoriteService.getFavoriteCount(recipeId);

            return ResponseEntity.ok(
                Map.of("count", count)
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest().build();
        }
    }

    // Toggle favorite
    @PostMapping("/user/{userId}/recipe/{recipeId}/toggle")
    public ResponseEntity<?> toggleFavorite(
            @PathVariable Long userId,
            @PathVariable Long recipeId) {

        try {
            boolean isFavorited =
                    favoriteService.toggleFavorite(userId, recipeId);

            return ResponseEntity.ok(
                Map.of(
                    "message",
                    isFavorited
                            ? "Added to favorites"
                            : "Removed from favorites",

                    "isFavorited",
                    isFavorited
                )
            );

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }
}