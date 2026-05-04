package com.recipefinder.backend.service;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import com.recipefinder.backend.model.Recipe;
import com.recipefinder.backend.repository.RecipeRepository;

@ExtendWith(MockitoExtension.class)
class RecipeServiceTest {

    @Mock
    private RecipeRepository repository;

    @InjectMocks
    private RecipeService service;

    @Test
    void testFindRecipesByIngredients() {

        // Arrange
        Recipe recipe = new Recipe();
        recipe.setId(1L);
        recipe.setTitle("Chicken Pasta");
        recipe.setIngredients(List.of("chicken", "pasta", "tomato"));

        when(repository.findAll()).thenReturn(List.of(recipe));

        // Act
        List<String> userIngredients = List.of("chicken", "pasta");

        List<Recipe> result = service.findRecipesByIngredients(userIngredients);

        // Assert
        assertEquals(1, result.size());
        assertEquals("Chicken Pasta", result.get(0).getTitle());
        assertTrue(result.get(0).getIngredients().contains("chicken"));
    }
}