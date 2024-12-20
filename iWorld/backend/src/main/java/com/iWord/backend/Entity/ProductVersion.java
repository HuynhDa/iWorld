package com.iWord.backend.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "product_versions")
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

    @Column(name = "total_quantity", nullable = false)
    private Integer totalQuantity = 0;

    @Column(nullable = false)
    private Integer quantity = 0;

    @Column(name = "sold_quantity", nullable = false)
    private Integer soldQuantity = 0;

    @Column(nullable = false)
    private String price;
}
