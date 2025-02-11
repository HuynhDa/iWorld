package com.backend.backend.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class UserDTO {
    private Integer id; // ID người dùng
    private String name; // Tên người dùng
    private String email; // Email người dùng
    private String phoneNumber; // Số điện thoại
    private Integer role; // Vai trò (0: Admin, 1: User)
    private LocalDateTime createdAt; // Thời gian tạo tài khoản
    private List<ShippingAddressDTO> shippingAddresses; // Danh sách địa chỉ giao hàng
    private List<OrderDTO> orders; // Danh sách đơn hàng
}
