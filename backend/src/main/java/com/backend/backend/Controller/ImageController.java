// package com.backend.backend.Controller;

// import java.io.File;
// import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Path;
// import java.nio.file.Paths;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.MediaType;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.backend.backend.Entity.ProductImage;
// import com.backend.backend.Service.ProductImageService;

// @RestController
// @RequestMapping("/images")
// public class ImageController {

//     @Autowired
//     private ProductImageService productImageService;

//     @GetMapping("/{imageName}")
//     public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
//         // Tìm hình ảnh trong cơ sở dữ liệu
//         ProductImage productImage = productImageService.findByImageUrl(imageName);
//           Path imagePath = Paths.get("src/main/resources/static/images/Iphone14").resolve(imageName).normalize();

        
//         if (productImage == null) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//         }

//         // Đọc tệp hình ảnh từ hệ thống file hoặc URL trong cơ sở dữ liệu
//         File imageFile = new File(productImage.getImageUrl());

//         if (imageFile.exists()) {
//             try {
//                 byte[] imageBytes = Files.readAllBytes(imageFile.toPath());
//                 return ResponseEntity.ok()
//                         .contentType(MediaType.IMAGE_PNG) // Hoặc MediaType khác nếu là PNG, GIF, v.v.
//                         .body(imageBytes);
//             } catch (IOException e) {
//                 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//             }
//         } else {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//         }
//     }
// }

