package com.recipefinder.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.recipefinder.backend.model.User;
import com.recipefinder.backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testRegister() throws Exception {

        User user = User.builder()
                .username("test")
                .email("test@gmail.com")
                .password("12345678")
                .build();

        when(userService.register(any(User.class))).thenReturn(user);

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@gmail.com"));
    }

    @Test
    void testLoginSuccess() throws Exception {

        User user = User.builder()
                .id(1L)
                .username("test")
                .email("test@gmail.com")
                .password("encoded")
                .build();

        when(userService.login(anyString(), anyString()))
                .thenReturn(Optional.of(user));

        String request = """
        {
            "email": "test@gmail.com",
            "password": "12345678"
        }
        """;

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(request))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@gmail.com"));
    }

    @Test
    void testLoginFail() throws Exception {

        when(userService.login(anyString(), anyString()))
                .thenReturn(Optional.empty());

        String request = """
        {
            "email": "wrong@gmail.com",
            "password": "1234"
        }
        """;

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(request))
                .andExpect(status().isUnauthorized());
    }
}