package com.recipefinder.backend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipefinder.backend.model.Recipe;
import com.recipefinder.backend.repository.RecipeRepository;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository repository;

    public List<Map<String, Object>> findRecipesByIngredients(List<String> userIngredients) {

        List<Recipe> recipes = repository.findAll();

        List<Map<String, Object>> result = new ArrayList<>();

        for (Recipe recipe : recipes) {

            List<String> recipeIngredients = recipe.getIngredients();

            long matchCount = recipeIngredients.stream()
                    .filter(userIngredients::contains)
                    .count();

            int total = recipeIngredients.size();

            int matchPercentage = (int) ((matchCount * 100) / total);

            int missing = total - (int) matchCount;

            Map<String, Object> data = new HashMap<>();
            data.put("id", recipe.getId());
            data.put("title", recipe.getTitle());
            data.put("description", recipe.getDescription());
            data.put("image", recipe.getImage());
            data.put("level", recipe.getLevel());
            data.put("rating", recipe.getRating());
            data.put("time", recipe.getTime());
            data.put("people", recipe.getPeople());
            data.put("type", recipe.getType());
            data.put("tags", recipe.getTags());
            data.put("match", matchPercentage);
            data.put("missing", missing);

            result.add(data);
        }

        // tri par match décroissant
        result.sort((a, b) -> (int)b.get("match") - (int)a.get("match"));

        return result;
    }
    public List<Recipe> getAllRecipes() {
    return repository.findAll();
}
}
