package com.backend.backend.Service.Impl;

import com.backend.backend.DTO.ShippingMethodDTO;
import com.backend.backend.Entity.ShippingMethod;
import com.backend.backend.Repository.ShippingMethodRepository;
import com.backend.backend.Service.ShippingMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShippingMethodServiceImpl implements ShippingMethodService {

    @Autowired
    private ShippingMethodRepository shippingMethodRepository;

    @Override
    public List<ShippingMethodDTO> getAllShippingMethods() {
        List<ShippingMethod> shippingMethods = shippingMethodRepository.findAll();
        return shippingMethods.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private ShippingMethodDTO convertToDTO(ShippingMethod shippingMethod) {
        ShippingMethodDTO dto = new ShippingMethodDTO();
        dto.setId(shippingMethod.getId());
        dto.setName(shippingMethod.getName());
        dto.setDescription(shippingMethod.getDescription());
        dto.setShippingFee(shippingMethod.getShippingFee());
        return dto;
    }
}