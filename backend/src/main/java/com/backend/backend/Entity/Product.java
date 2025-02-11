package com.backend.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @ManyToOne // Sửa lại @ManyToOne thay vì @OneToMany
    @JoinColumn(name = "category_id", nullable = false) // Đảm bảo rằng khóa ngoại category_id là không null
    @JsonBackReference // Ngăn vòng lặp
    private Category category;


    private String description;

    private String brandName = "Apple";

    private Integer status = 1; // 0: Hết hàng, 1: Còn hàng

    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();

    @OneToMany(mappedBy = "product")
    private List<ProductImage> productImages;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductVersion> productVersions;    

    @OneToMany(mappedBy = "product")
    private List<Review> reviews;
}
