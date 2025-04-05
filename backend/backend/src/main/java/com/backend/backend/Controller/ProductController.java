package com.backend.backend.Controller;

import com.backend.backend.DTO.CategoryDTO;
import com.backend.backend.DTO.ProductDTO;
import com.backend.backend.DTO.ProductImageDTO;
import com.backend.backend.Entity.Category;
import com.backend.backend.Repository.CategoryRepository;
import com.backend.backend.Service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryRepository categoryRepository;

    // Endpoint to get all products
    @GetMapping("/quanlysanpham")
    public List<ProductDTO> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();

        // Cập nhật đường dẫn hình ảnh để có thể truy cập từ frontend
        updateImageUrls(products);

        return products;
    }
    
    @GetMapping("/topselling")
    public List<ProductDTO> getTop3SellingProducts() {
        List<ProductDTO> topSellingProducts = productService.getTop3SellingProducts();

        // Cập nhật đường dẫn hình ảnh để có thể truy cập từ frontend
        updateImageUrls(topSellingProducts);

        return topSellingProducts;
    }

    // Endpoint to get product by ID
    @GetMapping("/{id}")
    public ProductDTO getProductById(@PathVariable Integer id) {
        ProductDTO product = productService.getProductById(id);

        // Cập nhật đường dẫn hình ảnh
        updateImageUrlsForProduct(product);

        return product;
    }

    // Phương thức tái sử dụng để cập nhật đường dẫn hình ảnh cho một danh sách sản
    // phẩm
    private void updateImageUrls(List<ProductDTO> products) {
        if (products != null) {
            for (ProductDTO product : products) {
                updateImageUrlsForProduct(product);
            }
        }
    }

    // Phương thức tái sử dụng để cập nhật đường dẫn hình ảnh cho một sản phẩm
    private void updateImageUrlsForProduct(ProductDTO product) {
        if (product.getProductImages() != null) {
            for (ProductImageDTO imageDTO : product.getProductImages()) {
                String imageUrl = imageDTO.getImageUrl();
                if (imageUrl != null) {
                    // Chuyển đổi đường dẫn file thành URL
                    String fileName = new File(imageUrl).getName();
                    imageDTO.setImageUrl("/images/" + fileName);
                }
            }
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addProduct(
            @RequestPart("productDTO") ProductDTO productDTO,
            @RequestParam("images") MultipartFile[] images) {

        System.out.println("Received product: " + productDTO);

        try {
            // Tạo đối tượng CategoryDTO từ categoryId
            Category category = categoryRepository.findById(productDTO.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));
            CategoryDTO categoryDTO = new CategoryDTO(category.getId(), category.getName(), category.getDescription());
            productDTO.setCategory(categoryDTO);

            // Gọi service để thêm sản phẩm
            productService.addProduct(productDTO, images);
            return ResponseEntity.ok("Sản phẩm đã được thêm thành công!");
        } catch (Exception e) {
            e.printStackTrace(); // In lỗi chi tiết ra log
            return ResponseEntity.status(500).body("Lỗi khi thêm sản phẩm: " + e.getMessage());
        }
    }

    // Endpoint to update product by ID
    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(
            @PathVariable Integer id,
            @RequestPart("productDTO") ProductDTO productDTO,
            @RequestParam(value = "images", required = false) MultipartFile[] images) {
        try {
            productService.updateProduct(id, productDTO, images);
            return ResponseEntity.ok("Sản phẩm đã được cập nhật thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi cập nhật sản phẩm: " + e.getMessage());
        }
    }

    // Endpoint to delete product by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok("Sản phẩm đã được xóa thành công!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Lỗi khi xóa sản phẩm: " + e.getMessage());
        }
    }
}
