package com.recipefinder.backend.service;

import com.recipefinder.backend.model.User;
import com.recipefinder.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // REGISTER
    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // LOGIN
    public Optional<User> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> encoder.matches(password, user.getPassword()));
    }
}