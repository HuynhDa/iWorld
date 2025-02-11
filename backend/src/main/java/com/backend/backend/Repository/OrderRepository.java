package com.backend.backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.Entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
        List<Order>findByUserId(Integer userId);
}
