package com.backend.backend.DTO;

import java.time.LocalDateTime;
import java.util.List;

public class ProductDTO {

    private Integer id;
    private String name;
    private CategoryDTO category;
    private String description;
    private String brandName;
    private Integer status;
    private LocalDateTime createdAt;
    private List<ProductImageDTO> productImages;
    private List<ProductVersionDTO> productVersions;
    private List<Integer> imagesToDelete; // Thay đổi thành List<Integer>

    // Constructor phù hợp với các tham số truyền vào
    public ProductDTO(Integer id, String name, CategoryDTO category, String description, String brandName, Integer status, LocalDateTime createdAt, List<ProductImageDTO> productImages, List<ProductVersionDTO> productVersions, List<Integer> imagesToDelete) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.brandName = brandName;
        this.status = status;
        this.createdAt = createdAt;
        this.productImages = productImages;
        this.productVersions = productVersions;
        this.imagesToDelete = imagesToDelete; // Khởi tạo trường này
    }

     // Constructor với các tham số tối thiểu
     public ProductDTO(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getters và Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<ProductImageDTO> getProductImages() {
        return productImages;
    }

    public void setProductImages(List<ProductImageDTO> productImages) {
        this.productImages = productImages;
    }

    public List<ProductVersionDTO> getProductVersions() {
        return productVersions;
    }

    public void setProductVersions(List<ProductVersionDTO> productVersions) {
        this.productVersions = productVersions;
    }

    public List<Integer> getImagesToDelete() { // Thêm phương thức getter
        return imagesToDelete;
    }

    public void setImagesToDelete(List<Integer> imagesToDelete) { // Thêm phương thức setter
        this.imagesToDelete = imagesToDelete;
    }
}