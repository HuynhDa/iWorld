package com.backend.backend.Controller;

import com.backend.backend.DTO.CartDTO;
import com.backend.backend.DTO.CartItemDTO;
import com.backend.backend.Service.CartService;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<CartDTO> getCartByUserId(@PathVariable Integer userId) {
        Optional<CartDTO> cartDTO = cartService.getCartByUserId(userId);
        return cartDTO.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{userId}/item/{itemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Integer userId, @PathVariable Integer itemId) {
        cartService.removeCartItem(userId, itemId);
        return ResponseEntity.noContent().build();
    }
    @CrossOrigin(origins = "http://localhost:3000") // Thay đổi URL này thành URL frontend của bạn
    @PostMapping("/{userId}/add")
    public ResponseEntity<Void> addCartItem(@PathVariable Integer userId, @RequestBody CartItemDTO cartItemDTO) {
        cartService.addCartItem(userId, cartItemDTO);
        return ResponseEntity.ok().build();
    }
}
