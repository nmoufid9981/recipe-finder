package com.recipefinder.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * DTO for Recipe to avoid lazy loading and serialization issues
 * Prevents ByteBuddyInterceptor and hibernateLazyInitializer errors
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeDTO {
    private Long id;
    private String title;
    private String description;
    private String image;
    private String level;
    private double rating;
    private String time;
    private int people;
    private String type;
    private List<String> tags;
    private List<String> ingredients;
}
