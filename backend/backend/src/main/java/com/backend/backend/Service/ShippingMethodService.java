package com.backend.backend.Service;

import com.backend.backend.DTO.ShippingMethodDTO;

import java.util.List;

public interface ShippingMethodService {
    List<ShippingMethodDTO> getAllShippingMethods();
}