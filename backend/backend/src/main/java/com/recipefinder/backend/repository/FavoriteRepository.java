package com.recipefinder.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.recipefinder.backend.model.Favorite;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    
    // Find all favorites for a specific user
    List<Favorite> findByUserId(Long userId);
    
    // Check if a user has favorited a specific recipe
    boolean existsByUserIdAndRecipeId(Long userId, Long recipeId);
    
    // Find a specific favorite by user and recipe
    Optional<Favorite> findByUserIdAndRecipeId(Long userId, Long recipeId);
    
    // Remove a favorite by user and recipe
    void deleteByUserIdAndRecipeId(Long userId, Long recipeId);
    
    // Count favorites for a recipe
    long countByRecipeId(Long recipeId);
}
