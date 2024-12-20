package com.iWord.backend.Service.Impl;

import com.iWord.backend.Entity.Product;
import com.iWord.backend.Repository.ProductsRepository;
import com.iWord.backend.Service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductsServiceImpl implements ProductsService {  // Changed 'productsService' to 'ProductsService'
    
    @Autowired
    private ProductsRepository productsRepository;

    @Override
    public List<Product> getAllProducts() {
        return productsRepository.findAll();
    }
}
