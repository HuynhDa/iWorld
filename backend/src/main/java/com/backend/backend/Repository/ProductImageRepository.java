package com.backend.backend.Repository;

import com.backend.backend.Entity.ProductImage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

// ProductImageRepository.java
public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
    List<ProductImage> findByProductId(Integer productId);  // Lấy hình ảnh theo sản phẩm
}

