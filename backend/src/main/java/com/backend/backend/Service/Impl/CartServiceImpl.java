package com.backend.backend.Service.Impl;

import com.backend.backend.DTO.CartDTO;
import com.backend.backend.DTO.CartItemDTO;

import com.backend.backend.DTO.ProductVersionDTO;
import com.backend.backend.Entity.Cart;
import com.backend.backend.Entity.CartItem;
import com.backend.backend.Entity.ProductVersion;
import com.backend.backend.Repository.CartRepository;
import com.backend.backend.Repository.ProductVersionRepository;
import com.backend.backend.Repository.UserRepository;
import com.backend.backend.Service.CartService;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductVersionRepository productVersionRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger Logger = LoggerFactory.getLogger(CartServiceImpl.class);

    @Override
    public Optional<CartDTO> getCartByUserId(Integer userId) {
        Optional<Cart> cart = cartRepository.findByUserId(userId);
        if (cart.isPresent()) {
            CartDTO cartDTO = convertToCartDTO(cart.get());
            return Optional.of(cartDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public void removeCartItem(Integer userId, Integer itemId) {
        Optional<Cart> cart = cartRepository.findByUserId(userId);
        if (cart.isPresent()) {
            Cart cartEntity = cart.get();
            boolean removed = cartEntity.getCartItems().removeIf(item -> item.getId().equals(itemId));
            if (removed) {
                cartRepository.save(cartEntity);
                Logger.info("Item with ID {} removed from cart for user ID {}", itemId, userId);
            } else {
                Logger.warn("Item with ID {} not found in cart for user ID {}", itemId, userId);
            }
        } else {
            Logger.warn("Cart not found for user ID {}", userId);
        }
    }

    @Override
    public void addCartItem(Integer userId, CartItemDTO cartItemDTO) {
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        Cart cart;
        if (optionalCart.isPresent()) {
            cart = optionalCart.get();
        } else {
            // Create a new cart for the user if it does not exist
            cart = new Cart();
            cart.setUser(userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found")));
            cart.setCreatedAt(LocalDateTime.now());
            cart.setUpdatedAt(LocalDateTime.now());
            cart = cartRepository.save(cart);
            Logger.info("Created new cart for user ID {}", userId);
        }

        ProductVersionDTO productVersionDTO = cartItemDTO.getProductVersion();
        if (productVersionDTO == null) {
            throw new IllegalArgumentException("Product version cannot be null");
        }

        ProductVersion productVersion = productVersionRepository.findById(productVersionDTO.getId())
                .orElseThrow(() -> new RuntimeException("ProductVersion not found"));

        // Check if the product already exists in the cart, if so, just update the
        // quantity
        Optional<CartItem> existingCartItem = cart.getCartItems().stream()
                .filter(item -> item.getProductVersion().getId().equals(productVersion.getId()))
                .findFirst();

        if (existingCartItem.isPresent()) {
            CartItem cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + cartItemDTO.getQuantity());
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setProductVersion(productVersion);
            cartItem.setQuantity(cartItemDTO.getQuantity());
            cartItem.setCart(cart); // Ensure the cart property is set
            cart.getCartItems().add(cartItem);
        }

        cartRepository.save(cart);
    }

    private CartDTO convertToCartDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setUserId(cart.getUser().getId());
        cartDTO.setCreatedAt(cart.getCreatedAt());
        cartDTO.setUpdatedAt(cart.getUpdatedAt());
        cartDTO.setCartItems(cart.getCartItems().stream()
                .map(this::convertToCartItemDTO)
                .collect(Collectors.toList()));
        return cartDTO;
    }

    private CartItemDTO convertToCartItemDTO(CartItem cartItem) {
        CartItemDTO cartItemDTO = new CartItemDTO();
        cartItemDTO.setId(cartItem.getId());
        cartItemDTO.setProductVersion(convertToProductVersionDTO(cartItem.getProductVersion()));
        cartItemDTO.setQuantity(cartItem.getQuantity());
        return cartItemDTO;
    }

    private ProductVersionDTO convertToProductVersionDTO(ProductVersion productVersion) {
        String imageUrl = productVersion.getProduct().getProductImages().isEmpty() ? "default-image-url"
                : productVersion.getProduct().getProductImages().get(0).getImageUrl();
        ProductVersionDTO productVersionDTO = new ProductVersionDTO();
        productVersionDTO.setId(productVersion.getId());
        productVersionDTO.setName(productVersion.getProductName());
        productVersionDTO.setPrice(productVersion.getPrice());
        productVersionDTO.setImageUrl(imageUrl);
        return productVersionDTO;
    }

}
