package com.recipefinder.backend.service;

import com.recipefinder.backend.model.User;
import com.recipefinder.backend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    void testRegisterUser() {
        User user = User.builder()
                .username("test")
                .email("test@gmail.com")
                .password("12345678")
                .build();

        when(userRepository.save(any(User.class))).thenReturn(user);

        User saved = userService.register(user);

        assertNotNull(saved);
        assertEquals("test@gmail.com", saved.getEmail());
        assertTrue(encoder.matches("12345678", saved.getPassword()));
    }

    @Test
    void testLoginSuccess() {
        User user = User.builder()
                .email("test@gmail.com")
                .password(encoder.encode("12345678"))
                .build();

        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));

        Optional<User> result = userService.login("test@gmail.com", "12345678");

        assertTrue(result.isPresent());
    }

    @Test
    void testLoginFail() {
        when(userRepository.findByEmail("wrong@gmail.com"))
                .thenReturn(Optional.empty());

        Optional<User> result = userService.login("wrong@gmail.com", "1234");

        assertTrue(result.isEmpty());
    }
}