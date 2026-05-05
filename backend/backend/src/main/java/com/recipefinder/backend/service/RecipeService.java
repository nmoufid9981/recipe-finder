package com.recipefinder.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipefinder.backend.model.Recipe;
import com.recipefinder.backend.repository.RecipeRepository;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository repository;

    // 🔍 SEARCH BY INGREDIENTS
    public List<Recipe> findRecipesByIngredients(List<String> userIngredients) {

        List<String> normalizedInput = userIngredients.stream()
                .map(String::toLowerCase)
                .toList();

        return repository.findAll().stream()
                .filter(recipe -> recipe.getIngredients() != null
                        && normalizedInput.stream().allMatch(input ->
                            recipe.getIngredients().stream()
                                .map(String::toLowerCase)
                                .anyMatch(ing -> ing.contains(input))
                        )
                )
                .toList();
    }

    // 📦 GET ALL RECIPES
    public List<Recipe> getAllRecipes() {
        return repository.findAll();
    }

    // 🔥 GET BY ID
    public Optional<Recipe> getRecipeById(Long id) {
        return repository.findById(id);
    }
}