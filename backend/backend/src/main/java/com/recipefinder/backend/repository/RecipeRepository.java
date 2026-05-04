package com.recipefinder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.recipefinder.backend.model.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}