package com.backend.backend.Service;

import java.util.Optional;

import com.backend.backend.DTO.CartDTO;
import com.backend.backend.DTO.CartItemDTO;

public interface CartService {
    Optional<CartDTO> getCartByUserId(Integer userId);
    void removeCartItem(Integer userId, Integer itemId); // Thêm phương thức này
    void addCartItem(Integer userId, CartItemDTO cartItemDTO);

}
