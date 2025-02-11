package com.backend.backend.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CartDTO {
    private Integer id;
    private Integer userId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<CartItemDTO> cartItems;

    // Constructor không tham số
    public CartDTO() {
    }

    // Constructor đầy đủ tham số
    public CartDTO(Integer id, Integer userId, LocalDateTime createdAt, LocalDateTime updatedAt, List<CartItemDTO> cartItems) {
        this.id = id;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.cartItems = cartItems;
    }
}
