package com.backend.backend.Service.Impl;

import com.backend.backend.DTO.ProductDTO;
import com.backend.backend.DTO.ProductImageDTO;
import com.backend.backend.DTO.ProductVersionDTO;
import com.backend.backend.DTO.CategoryDTO;
import com.backend.backend.Entity.Category;
import com.backend.backend.Entity.Product;
import com.backend.backend.Entity.ProductImage;
import com.backend.backend.Entity.ProductVersion;
import com.backend.backend.Entity.Review;
import com.backend.backend.Repository.CategoryRepository;
import com.backend.backend.Repository.ProductImageRepository;
import com.backend.backend.Repository.ProductRepository;
import com.backend.backend.Repository.ProductVersionRepository;
import com.backend.backend.Repository.ReviewRepository;
import com.backend.backend.Service.ProductService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductImageRepository productImageRepository;
    @Autowired
    private ProductVersionRepository productVersionRepository;
    @Autowired
    private ReviewRepository reviewRepository;

    // Convert Product to ProductDTO
    private ProductDTO convertToDTO(Product product) {
        CategoryDTO categoryDTO = new CategoryDTO(product.getCategory().getId(), product.getCategory().getName(),
                product.getCategory().getDescription());
        List<ProductImageDTO> productImageDTOs = product.getProductImages().stream()
                .map(image -> new ProductImageDTO(image.getId(), image.getImageUrl()))
                .collect(Collectors.toList());
        List<ProductVersionDTO> productVersionDTOs = product.getProductVersions().stream()
                .map(version -> new ProductVersionDTO(version.getId(), version.getStorageCapacity(),
                        version.getRamSize(), version.getChip(), version.getColor(), version.getTotalQuantity(),
                        version.getQuantity(), version.getSoldQuantity(), version.getPrice(),
                        product.getName(), // Assuming you want the name from the product
                        productImageDTOs.isEmpty() ? "default-image-url" : productImageDTOs.get(0).getImageUrl() // Assuming you want the first image URL
                ))
                .collect(Collectors.toList());
    
        // Assuming that imagesToDelete is a new list that you can initialize here or elsewhere
        List<Integer> imagesToDelete = new ArrayList<>();
    
        return new ProductDTO(
                product.getId(),
                product.getName(),
                categoryDTO,
                product.getDescription(),
                product.getBrandName(),
                product.getStatus(),
                product.getCreatedAt(),
                productImageDTOs,
                productVersionDTOs,
                imagesToDelete); // Pass the imagesToDelete list
    }

    // Get all products and return as DTO
    @Override
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // Get a product by ID and return as DTO
    @Override
    public ProductDTO getProductById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return convertToDTO(product);
    }

    @Override
    public void addProduct(ProductDTO productDTO, MultipartFile[] images) {
        // Kiểm tra categoryId từ ProductDTO và tìm Category tương ứng trong database
        if (productDTO.getCategory() == null || productDTO.getCategory().getId() == null) {
            throw new RuntimeException("Danh mục không tồn tại");
        }

        Long categoryId = productDTO.getCategory().getId(); // Lấy categoryId từ ProductDTO

        // Tìm Category trong database bằng categoryId
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));

        // Chuyển thông tin category từ database vào ProductDTO
        productDTO.setCategory(new CategoryDTO(category.getId(), category.getName(), category.getDescription()));

        // Tạo đối tượng Product từ ProductDTO
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setCategory(category);
        product.setDescription(productDTO.getDescription());
        product.setBrandName(productDTO.getBrandName());
        product.setStatus(productDTO.getStatus());
        product.setCreatedAt(productDTO.getCreatedAt());

        // Lưu sản phẩm vào cơ sở dữ liệu
        productRepository.save(product);

        // Lưu hình ảnh sản phẩm
        if (images != null && images.length > 0) {
            saveProductImages(images, product);
        }

        // Lưu các phiên bản sản phẩm (không cần kiểm tra bảng ProductVersion trước)
        List<ProductVersionDTO> versionDTOs = productDTO.getProductVersions();
        if (versionDTOs != null && !versionDTOs.isEmpty()) {
            for (ProductVersionDTO versionDTO : versionDTOs) {
                // Kiểm tra xem phần tử versionDTO có phải là null không
                if (versionDTO != null) {
                    System.out.println("Đang xử lý phiên bản sản phẩm: " + versionDTO);

                    // Tạo đối tượng ProductVersion mới
                    ProductVersion productVersion = new ProductVersion();
                    productVersion.setProduct(product); // Gán sản phẩm vào phiên bản mới

                    // Cập nhật các thông tin từ ProductVersionDTO vào ProductVersion
                    productVersion.setStorageCapacity(versionDTO.getStorageCapacity()); // Tùy chọn
                    productVersion.setRamSize(versionDTO.getRamSize()); // Tùy chọn
                    productVersion.setChip(versionDTO.getChip()); // Tùy chọn
                    productVersion.setColor(versionDTO.getColor()); // Tùy chọn
                    productVersion.setTotalQuantity(versionDTO.getTotalQuantity()); // Tùy chọn

                    // Luôn gán quantity bằng totalQuantity
                    productVersion.setQuantity(versionDTO.getTotalQuantity());

                    // Kiểm tra soldQuantity, nếu không có, gán giá trị mặc định là 0
                    if (versionDTO.getSoldQuantity() == null) {
                        productVersion.setSoldQuantity(0); // Giá trị mặc định
                    } else {
                        productVersion.setSoldQuantity(versionDTO.getSoldQuantity());
                    }

                    // Cập nhật giá sản phẩm
                    productVersion.setPrice(versionDTO.getPrice());

                    // Lưu phiên bản sản phẩm mới vào cơ sở dữ liệu
                    ProductVersion savedVersion = productVersionRepository.save(productVersion);
                    System.out.println("Đã lưu phiên bản sản phẩm mới: " + savedVersion.getId());
                } else {
                    // Nếu phần tử versionDTO là null, bạn có thể bỏ qua hoặc xử lý theo yêu cầu
                    System.out.println("Phiên bản sản phẩm không hợp lệ (null), bỏ qua.");
                }
            }
        } else {
            System.out.println("Không có phiên bản sản phẩm để lưu.");
        }

    }

    private void saveProductImages(MultipartFile[] images, Product product) {
        // Xử lý lưu hình ảnh vào thư mục
        String uploadDir = "D:\\DuAnCaNhan\\images\\";

        for (MultipartFile image : images) {
            String imageName = image.getOriginalFilename();
            File imageFile = new File(uploadDir + imageName);

            try {
                // Lưu hình ảnh vào thư mục
                image.transferTo(imageFile);

                // Lưu thông tin hình ảnh vào cơ sở dữ liệu
                ProductImage productImage = new ProductImage();
                productImage.setImageUrl(uploadDir + imageName);
                productImage.setProduct(product);
                productImageRepository.save(productImage);
            } catch (IOException e) {
                throw new RuntimeException("Lỗi khi lưu hình ảnh: " + e.getMessage());
            }
        }
    }

    @Override
    public void updateProduct(Integer id, ProductDTO productDTO, MultipartFile[] images) throws IOException {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Cập nhật thông tin sản phẩm
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setBrandName(productDTO.getBrandName());
        product.setStatus(productDTO.getStatus());
        product.setCreatedAt(productDTO.getCreatedAt());

        // Cập nhật danh mục
        if (productDTO.getCategory() != null && productDTO.getCategory().getId() != null) {
            Category category = categoryRepository.findById(productDTO.getCategory().getId())
                    .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại"));
            product.setCategory(category);
        }

        // Xóa hình ảnh cũ
        if (productDTO.getImagesToDelete() != null && !productDTO.getImagesToDelete().isEmpty()) {
            for (Integer imageId : productDTO.getImagesToDelete()) {
                Optional<ProductImage> optionalProductImage = productImageRepository.findById(imageId);
                if (optionalProductImage.isPresent()) {
                    ProductImage productImage = optionalProductImage.get();
                    // Xóa tệp hình ảnh khỏi hệ thống tệp
                    File imageFile = new File(productImage.getImageUrl());
                    if (imageFile.exists()) {
                        imageFile.delete();
                    }
                    // Xóa hình ảnh khỏi cơ sở dữ liệu
                    productImageRepository.delete(productImage);
                }
            }
        }

        // Cập nhật hình ảnh nếu có
        if (images != null && images.length > 0) {
            saveProductImages(images, product);
        }

        // Cập nhật các phiên bản sản phẩm
        List<ProductVersionDTO> versionDTOs = productDTO.getProductVersions();
        if (versionDTOs != null && !versionDTOs.isEmpty()) {
            for (ProductVersionDTO versionDTO : versionDTOs) {
                ProductVersion productVersion;
                if (versionDTO.getId() != null) {
                    Integer versionId = Integer.valueOf(versionDTO.getId());
                    Optional<ProductVersion> optionalProductVersion = productVersionRepository.findById(versionId);
                    if (optionalProductVersion.isPresent()) {
                        productVersion = optionalProductVersion.get();
                    } else {
                        productVersion = new ProductVersion();
                    }
                } else {
                    productVersion = new ProductVersion();
                }

                // Cập nhật các thông tin từ ProductVersionDTO vào ProductVersion
                productVersion.setProduct(product);
                productVersion.setStorageCapacity(versionDTO.getStorageCapacity());
                productVersion.setRamSize(versionDTO.getRamSize());
                productVersion.setChip(versionDTO.getChip());
                productVersion.setColor(versionDTO.getColor());
                productVersion.setTotalQuantity(versionDTO.getTotalQuantity());
                productVersion.setQuantity(versionDTO.getTotalQuantity());
                productVersion.setSoldQuantity(versionDTO.getSoldQuantity() != null ? versionDTO.getSoldQuantity() : 0);
                productVersion.setPrice(versionDTO.getPrice());

                productVersionRepository.save(productVersion);
            }
        }

        // Lưu sản phẩm với các thay đổi
        productRepository.save(product);
    }

    @Override
    @Transactional
    public void deleteProduct(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Xóa các bản ghi liên quan trong bảng reviews
        deleteProductReviews(product);

        // Xóa các hình ảnh liên quan trước khi xóa sản phẩm
        deleteProductImages(product);

        // Xóa sản phẩm
        productRepository.delete(product);
    }

    private void deleteProductImages(Product product) {
        List<ProductImage> images = product.getProductImages();
        for (ProductImage image : images) {
            productImageRepository.delete(image);
        }
    }

    private void deleteProductReviews(Product product) {
        List<Review> reviews = product.getReviews(); // Giả sử bạn có phương thức getProductReviews()
        for (Review review : reviews) {
            reviewRepository.delete(review);
        }
    }

}
