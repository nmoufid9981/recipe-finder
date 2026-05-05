package com.recipefinder.backend.repository;

import com.recipefinder.backend.model.Recipe;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class RecipeRepositoryTest {

    @Autowired
    private RecipeRepository recipeRepository;

    @Test
    void testSaveRecipe() {
        Recipe r = new Recipe();
        r.setTitle("Burger");

        Recipe saved = recipeRepository.save(r);

        assertNotNull(saved.getId());
        assertEquals("Burger", saved.getTitle());
    }
}