package com.backend.backend.Service.Impl;

import com.backend.backend.Entity.User;
import com.backend.backend.Repository.UserRepository;
import com.backend.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User authenticateUser(String email, String password) {
        // Tìm người dùng theo email
        User user = userRepository.findByEmail(email);

        // Kiểm tra xem người dùng có tồn tại và mật khẩu có đúng không
        if (user != null && user.getPassword().equals(password)) {

            // Kiểm tra vai trò của người dùng
            if (user.getRole() == 0) {
                // Đăng nhập admin (role 0)
                return user; // Trả về thông tin admin
            } else if (user.getRole() == 1) {
                // Đăng nhập người dùng (role 1)
                return user; // Trả về thông tin người dùng
            } else {
                throw new RuntimeException("Vai trò không hợp lệ");
            }
        }

        throw new RuntimeException("Thông tin đăng nhập không hợp lệ");
    }

    @Override
    public User registerUser(User user) {
        // Kiểm tra email đã tồn tại
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("Email đã tồn tại!");
        }

        // Mã hóa mật khẩu nếu cần
        user.setPassword(user.getPassword()); // Thay bằng BCrypt hoặc các phương pháp mã hóa khác

        // Gán mặc định vai trò cho người dùng
        user.setRole(1); // Vai trò mặc định là người dùng (role = 1)

        // Lưu thông tin người dùng vào cơ sở dữ liệu
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

}
