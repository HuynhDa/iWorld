package com.iWord.backend.Repository;

import com.iWord.backend.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductsRepository extends JpaRepository<Product, Integer> {
    // Additional custom queries if needed
}
