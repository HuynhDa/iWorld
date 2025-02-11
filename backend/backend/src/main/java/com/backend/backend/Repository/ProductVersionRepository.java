package com.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.Entity.ProductVersion;

@Repository
public interface ProductVersionRepository extends JpaRepository<ProductVersion, Integer> {
    
}
