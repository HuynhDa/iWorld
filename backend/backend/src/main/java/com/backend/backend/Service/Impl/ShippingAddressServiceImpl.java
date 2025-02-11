package com.backend.backend.Service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.DTO.ShippingAddressDTO;
import com.backend.backend.Entity.ShippingAddress;
import com.backend.backend.Entity.User;
import com.backend.backend.Repository.ShippingAddressRepository;
import com.backend.backend.Repository.UserRepository;
import com.backend.backend.Service.ShippingAddressService;

import java.util.List;

@Service
public class ShippingAddressServiceImpl implements ShippingAddressService {

    @Autowired
    private ShippingAddressRepository shippingAddressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<ShippingAddress> getShippingAddressesByUserId(Integer userId) {
        return shippingAddressRepository.findByUserId(userId);
    }

    @Override
    public ShippingAddress addShippingAddress(Integer userId, ShippingAddressDTO shippingAddressDTO) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        ShippingAddress shippingAddress = new ShippingAddress();
        shippingAddress.setUser(user);
        shippingAddress.setShippingName(shippingAddressDTO.getShippingName());
        shippingAddress.setShippingPhone(shippingAddressDTO.getShippingPhone());
        shippingAddress.setShippingAddress(shippingAddressDTO.getShippingAddress());
        shippingAddress.setIsDefault(shippingAddressDTO.getIsDefault());

        return shippingAddressRepository.save(shippingAddress);
    }

    @Override
    public ShippingAddress updateShippingAddress(Integer userId, ShippingAddressDTO shippingAddressDTO) {
        ShippingAddress shippingAddress = shippingAddressRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        shippingAddress.setShippingName(shippingAddressDTO.getShippingName());
        shippingAddress.setShippingPhone(shippingAddressDTO.getShippingPhone());
        shippingAddress.setShippingAddress(shippingAddressDTO.getShippingAddress());
        shippingAddress.setIsDefault(shippingAddressDTO.getIsDefault());

        return shippingAddressRepository.save(shippingAddress);
    }

    @Override
    public void deleteShippingAddress(Integer addressId) {
        ShippingAddress shippingAddress = shippingAddressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        shippingAddressRepository.delete(shippingAddress);
    }
}
