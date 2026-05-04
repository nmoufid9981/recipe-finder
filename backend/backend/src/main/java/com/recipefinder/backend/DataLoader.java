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

        // 🍝 Recipe 1
        Recipe r1 = new Recipe();
        r1.setTitle("Chicken Pasta");
        r1.setDescription("Creamy chicken pasta");
        r1.setImage("img1.jpg");
        r1.setLevel("Easy");
        r1.setRating(4.5);
        r1.setTime("30 min");
        r1.setPeople(2);
        r1.setType("Dinner");
        r1.setTags(List.of("quick", "pasta"));
        r1.setIngredients(List.of("chicken", "pasta", "tomato", "cream"));

        repository.save(r1);

        // 🍲 Recipe 2
        Recipe r2 = new Recipe();
        r2.setTitle("Tomato Salad");
        r2.setDescription("Fresh salad with tomatoes");
        r2.setImage("img2.jpg");
        r2.setLevel("Easy");
        r2.setRating(4.0);
        r2.setTime("10 min");
        r2.setPeople(1);
        r2.setType("Lunch");
        r2.setTags(List.of("healthy"));
        r2.setIngredients(List.of("tomato", "cucumber", "olive oil"));

        repository.save(r2);

        // 🍗 Recipe 3
        Recipe r3 = new Recipe();
        r3.setTitle("Grilled Chicken");
        r3.setDescription("Simple grilled chicken");
        r3.setImage("img3.jpg");
        r3.setLevel("Medium");
        r3.setRating(4.7);
        r3.setTime("40 min");
        r3.setPeople(2);
        r3.setType("Dinner");
        r3.setTags(List.of("protein"));
        r3.setIngredients(List.of("chicken", "garlic", "salt", "pepper"));

        repository.save(r3);

        // 🍕 Recipe 4
        Recipe r4 = new Recipe();
        r4.setTitle("Vegetable Pizza");
        r4.setDescription("Homemade veggie pizza");
        r4.setImage("img4.jpg");
        r4.setLevel("Medium");
        r4.setRating(4.3);
        r4.setTime("50 min");
        r4.setPeople(3);
        r4.setType("Dinner");
        r4.setTags(List.of("pizza", "vegetarian"));
        r4.setIngredients(List.of("flour", "tomato", "cheese", "pepper", "onion"));

        repository.save(r4);
    }
}