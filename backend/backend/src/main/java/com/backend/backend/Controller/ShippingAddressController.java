package com.backend.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.DTO.ShippingAddressDTO;
import com.backend.backend.Entity.ShippingAddress;
import com.backend.backend.Service.ShippingAddressService;

import java.util.List;

@RestController
@RequestMapping("/api/shipping-addresses")
public class ShippingAddressController {

    @Autowired
    private ShippingAddressService shippingAddressService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<ShippingAddress>> getShippingAddressesByUserId(@PathVariable Integer userId) {
        List<ShippingAddress> addresses = shippingAddressService.getShippingAddressesByUserId(userId);
        return ResponseEntity.ok(addresses);
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<ShippingAddress> addShippingAddress(
            @PathVariable Integer userId, // Ensure the path variable is correctly annotated
            @RequestBody ShippingAddressDTO shippingAddressDTO) {

        ShippingAddress newAddress = shippingAddressService.addShippingAddress(userId, shippingAddressDTO);
        return ResponseEntity.ok(newAddress);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<ShippingAddress> updateShippingAddress(
            @PathVariable Integer userId,
            @RequestBody ShippingAddressDTO shippingAddressDTO) {
        ShippingAddress updatedAddress = shippingAddressService.updateShippingAddress(userId, shippingAddressDTO);
        return ResponseEntity.ok(updatedAddress);
    }

    @DeleteMapping("/delete/{addressId}")
    public ResponseEntity<Void> deleteShippingAddress(@PathVariable Integer addressId) {
        shippingAddressService.deleteShippingAddress(addressId);
        return ResponseEntity.noContent().build();
    }
}
