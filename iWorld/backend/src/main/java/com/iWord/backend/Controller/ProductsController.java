package com.iWord.backend.Controller;

import com.iWord.backend.Entity.Product;
import com.iWord.backend.Service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductsController {

    @Autowired
    private ProductsService productsService;

    @GetMapping
    public List<Product> getAllProducts() {
        // Lấy danh sách sản phẩm từ service
        return productsService.getAllProducts();
    }
}
