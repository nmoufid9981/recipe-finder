package com.recipefinder.backend.service;

import com.recipefinder.backend.repository.FavoriteRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FavoriteServiceTest {

    @Mock
    private FavoriteRepository favoriteRepository;

    @InjectMocks
    private FavoriteService favoriteService;

    public FavoriteServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetFavoriteCount() {
        when(favoriteRepository.countByRecipeId(1L)).thenReturn(5L);

        long result = favoriteService.getFavoriteCount(1L);

        assertEquals(5L, result);
    }
}