package com.backend.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "product_versions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductVersion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;    

    private String storageCapacity;

    private String ramSize;

    private String chip;

    private String color;

    private Integer totalQuantity = 0;

    private Integer quantity = 0;

    private Integer soldQuantity = 0;

    private Double price;

    @OneToMany(mappedBy = "productVersion")
    private List<CartItem> cartItems;

    @OneToMany(mappedBy = "productVersion")
    private List<OrderItem> orderItems;

    // Phương thức để lấy tên sản phẩm từ đối tượng Product
    public String getProductName() {
        return product != null ? product.getName() : null;
    }
}
