package com.backend.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.Entity.PaymentMethod;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Integer> {
}