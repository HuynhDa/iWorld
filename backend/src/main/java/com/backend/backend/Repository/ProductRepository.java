package com.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.Entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // JpaRepository đã cung cấp phương thức `findById` mặc định rồi, không cần phải định nghĩa lại.
}
