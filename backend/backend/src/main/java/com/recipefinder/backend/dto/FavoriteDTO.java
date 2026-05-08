package com.recipefinder.backend.dto;

import com.recipefinder.backend.model.Recipe;
import com.recipefinder.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Favorite response to avoid infinite JSON recursion
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteDTO {
    private Long id;
    private Long userId;
    private String username;
    private Long recipeId;
    private String recipeTitle;
    private LocalDateTime createdAt;

    // Factory method to create DTO from Favorite entity
    public static FavoriteDTO fromFavorite(com.recipefinder.backend.model.Favorite favorite) {
        return FavoriteDTO.builder()
            .id(favorite.getId())
            .userId(favorite.getUser().getId())
            .username(favorite.getUser().getUsername())
            .recipeId(favorite.getRecipe().getId())
            .recipeTitle(favorite.getRecipe().getTitle())
            .createdAt(favorite.getCreatedAt())
            .build();
    }
}
