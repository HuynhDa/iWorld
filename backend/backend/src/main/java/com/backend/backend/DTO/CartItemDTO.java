package com.backend.backend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemDTO {
    private Integer id;
    private ProductDTO product;
    private Integer quantity;
    private ProductVersionDTO productVersion;


    // Constructor mặc định
    public CartItemDTO() {
    }

    // Constructor đầy đủ tham số
    public CartItemDTO(Integer id, ProductVersionDTO productVersion, Integer quantity) {
        this.id = id;
        this.productVersion = productVersion;
        this.quantity = quantity;
    }
}
