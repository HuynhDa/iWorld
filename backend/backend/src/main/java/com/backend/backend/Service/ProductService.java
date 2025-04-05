package com.backend.backend.Service;

import com.backend.backend.DTO.ProductDTO;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    List<ProductDTO> getAllProducts(); // Method to get all products as DTOs

    ProductDTO getProductById(Integer id); // Method to get product by id as DTO

    void addProduct(ProductDTO productDTO, MultipartFile[] images);

    void updateProduct(Integer id, ProductDTO productDTO, MultipartFile[] images) throws IOException;

    void deleteProduct(Integer id);

    List<ProductDTO> getTop3SellingProducts(); // Method to get top 3 selling products as DTOs
}
