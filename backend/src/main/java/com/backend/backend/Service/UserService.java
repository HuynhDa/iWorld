package com.backend.backend.Service;

import com.backend.backend.Entity.User;

public interface UserService {
    User authenticateUser(String email, String password);
    User registerUser(User user);
    User getUserById(Integer userId);
}
