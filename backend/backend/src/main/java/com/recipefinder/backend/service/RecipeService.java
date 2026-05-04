package com.recipefinder.backend.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

        // normalisation (optionnel mais recommandé)
        List<String> normalizedInput = userIngredients.stream()
                .map(String::toLowerCase)
                .collect(Collectors.toList());

        return repository.findAll().stream()
                .filter(recipe -> recipe.getIngredients() != null
                        && recipe.getIngredients().stream()
                            .map(String::toLowerCase)
                            .anyMatch(normalizedInput::contains))
                .collect(Collectors.toList());
    }

    // 📦 GET ALL RECIPES
    public List<Recipe> getAllRecipes() {
        return repository.findAll();
    }

    // 🧩 Helper optionnel (si tu veux gérer string directement)
    public List<Recipe> searchByIngredientsString(String ingredients) {

        List<String> list = Arrays.stream(ingredients.split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .toList();

        return findRecipesByIngredients(list);
    }
}