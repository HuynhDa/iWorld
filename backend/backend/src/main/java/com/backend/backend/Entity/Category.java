package com.backend.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

     // Mối quan hệ OneToMany từ Category tới Product
     @OneToMany(mappedBy = "category")
    @JsonManagedReference // Quản lý vòng lặp
     private Set<Product> products; // Một danh mục có thể chứa nhiều sản phẩm
    // Thêm hoặc sửa các quan hệ liên quan (nếu cần thiết)
    // @OneToMany(mappedBy = "category")
    // private List<Product> products;

    // Getter, Setter, Constructors
}

