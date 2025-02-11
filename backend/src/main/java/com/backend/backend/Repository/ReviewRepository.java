package com.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.Entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    
}
