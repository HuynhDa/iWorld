package com.backend.backend.Service.Impl;

import com.backend.backend.DTO.PaymentMethodDTO;
import com.backend.backend.Entity.PaymentMethod;
import com.backend.backend.Repository.PaymentMethodRepository;
import com.backend.backend.Service.PaymentMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService {

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Override
    public List<PaymentMethodDTO> getAllPaymentMethods() {
        List<PaymentMethod> paymentMethods =paymentMethodRepository.findAll();
        return paymentMethods.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private PaymentMethodDTO convertToDTO(PaymentMethod paymentMethod) {
        PaymentMethodDTO dto = new PaymentMethodDTO();
        dto.setId(paymentMethod.getId());
        dto.setName(paymentMethod.getName());
        dto.setDescription(paymentMethod.getDescription());
        return dto;
    }
}
