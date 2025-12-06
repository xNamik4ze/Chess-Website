package com.chess.controller;

import com.chess.model.User;
import com.chess.service.UserService;
import com.chess.service.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getMyInfo(@RequestHeader("Authorization") String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing token");
        }

        String token = authHeader.substring(7);

        // Dùng đúng hàm trong JwtService
        String username = jwtService.getUsernameFromToken(token);

        User user = userService.findByUsername(username);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        // Không gửi password ra FE
        user.setPassword(null);

        Map<String, Object> data = new HashMap<>();
        data.put("username", user.getUsername());
        data.put("elo", user.getElo());

        return ResponseEntity.ok(data);
    }
}
