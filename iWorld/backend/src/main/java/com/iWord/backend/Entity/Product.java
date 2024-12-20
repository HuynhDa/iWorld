package com.iWord.backend.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    private String description;

    @Column(name = "brand_name", nullable = false)
    private String brandName = "Apple";  // Default to Apple

    @Column(nullable = false)
    private Integer status = 1;  // Default available

    @Column(name = "created_at", updatable = false)
    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();

    @OneToMany(mappedBy = "product")
    private List<ProductImage> images;

    @OneToMany(mappedBy = "product")
    private List<ProductVersion> versions;

    public String getPrice() {
        return versions != null && !versions.isEmpty() ? versions.get(0).getPrice() : "";
    }

    public String getImageUrl() {
        return images != null && !images.isEmpty() ? images.get(0).getImageUrl() : "";
    }
}
