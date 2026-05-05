package com.recipefinder.backend.service;

import com.recipefinder.backend.model.Recipe;
import com.recipefinder.backend.repository.RecipeRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RecipeServiceTest {

    @Mock
    private RecipeRepository recipeRepository;

    @InjectMocks
    private RecipeService recipeService;

    @Test
    void testGetAllRecipes() {
        Recipe r1 = new Recipe();
        r1.setTitle("Pizza");

        when(recipeRepository.findAll()).thenReturn(List.of(r1));

        List<Recipe> result = recipeService.getAllRecipes();

        assertEquals(1, result.size());
        assertEquals("Pizza", result.get(0).getTitle());
    }
}