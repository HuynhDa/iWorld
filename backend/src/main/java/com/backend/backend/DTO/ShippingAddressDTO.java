package com.backend.backend.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ShippingAddressDTO {
    private Integer id; // ID địa chỉ giao hàng
    private Integer userId; // ID người dùng
    private String shippingName; // Tên người nhận
    private String shippingPhone; // Số điện thoại người nhận
    private String shippingAddress; // Địa chỉ giao hàng chi tiết
    private Boolean isDefault; // Có phải địa chỉ mặc định hay không
    private LocalDateTime createdAt; // Thời gian tạo địa chỉ
}
