package com.backend.backend.Controller;

import com.backend.backend.Entity.User;
import com.backend.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        System.out.println("Login request received for email: " + loginRequest.getEmail());
        User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (user != null) {
            System.out.println("Login successful for: " + user.getEmail());
            return ResponseEntity.ok(user);  // Trả về đối tượng User dưới dạng JSON
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }
    }
}
