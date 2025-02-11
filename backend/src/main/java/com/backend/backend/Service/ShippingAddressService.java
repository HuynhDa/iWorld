package com.backend.backend.Service;

import java.util.List;

import com.backend.backend.DTO.ShippingAddressDTO;
import com.backend.backend.Entity.ShippingAddress;

public interface ShippingAddressService {
    List<ShippingAddress> getShippingAddressesByUserId(Integer userId);
    ShippingAddress addShippingAddress(Integer userId, ShippingAddressDTO shippingAddressDTO); // Update the method signature
    ShippingAddress updateShippingAddress(Integer userId, ShippingAddressDTO shippingAddressDTO); // Update the method signature
    void deleteShippingAddress(Integer addressId); // Update the method signature
}

