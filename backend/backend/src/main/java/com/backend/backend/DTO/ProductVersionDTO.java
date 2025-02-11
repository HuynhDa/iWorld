package com.backend.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductVersionDTO {
    private Integer id;
    private String storageCapacity;
    private String ramSize;
    private String chip;
    private String color;
    private Integer totalQuantity;
    private Integer quantity;
    private Integer soldQuantity;
    private Double price;
    private String name; // Thêm thuộc tính name
    private String imageUrl; // Thêm thuộc tính imageUrl



    @Override
    public String toString() {
        return "ProductVersionDTO{" +
                "storageCapacity='" + storageCapacity + '\'' +
                ", ramSize='" + ramSize + '\'' +
                ", chip='" + chip + '\'' +
                ", color='" + color + '\'' +
                ", totalQuantity=" + totalQuantity + '\'' +
                ", quantity=" + quantity + '\'' +
                ", price=" + price + '\'' +
                ", soldQuantityy=" + soldQuantity + '\'' +
                '}';
    }

  

    // Constructor đầy đủ tham số
    public ProductVersionDTO(Integer id, String storageCapacity, String ramSize, String chip, String color,
                             Integer totalQuantity, Integer quantity, Integer soldQuantity, Double price, String imageUrl) {
        this.id = id;
        this.storageCapacity = storageCapacity;
        this.ramSize = ramSize;
        this.chip = chip;
        this.color = color;
        this.totalQuantity = totalQuantity;
        this.quantity = quantity;
        this.soldQuantity = soldQuantity;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}
