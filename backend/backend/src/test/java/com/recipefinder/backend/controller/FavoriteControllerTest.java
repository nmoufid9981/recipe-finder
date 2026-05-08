package com.recipefinder.backend.controller;

import com.recipefinder.backend.service.FavoriteService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;
import java.util.List;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FavoriteController.class)
public class FavoriteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FavoriteService favoriteService;

    @Test
    @WithMockUser
    void testGetFavorites() throws Exception {

        Mockito.when(favoriteService.getFavoriteRecipes(1L))
                .thenReturn(List.of());

        mockMvc.perform(get("/api/favorites/user/1"))
                .andExpect(status().isOk());
    }
}