package com.recipefinder.backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.recipefinder.backend.model.Recipe;
import com.recipefinder.backend.repository.RecipeRepository;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private RecipeRepository repository;

    @Override
    public void run(String... args) {

        Recipe r = new Recipe();
        r.setTitle("Chicken Pasta");
        r.setDescription("Delicious pasta");
        r.setImage("img");
        r.setLevel("Easy");
        r.setRating(4.5);
        r.setTime("30 min");
        r.setPeople(2);
        r.setType("Dinner");
        r.setTags(List.of("quick"));
        r.setIngredients(List.of("chicken", "pasta", "tomato"));

        repository.save(r);
    }
}