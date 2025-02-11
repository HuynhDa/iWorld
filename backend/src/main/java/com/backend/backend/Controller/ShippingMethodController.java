package com.backend.backend.Controller;

import com.backend.backend.DTO.ShippingMethodDTO;
import com.backend.backend.Service.ShippingMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/shipping-methods")
public class ShippingMethodController {

    @Autowired
    private ShippingMethodService shippingMethodService;

    @GetMapping
    public List<ShippingMethodDTO> getAllShippingMethods() {
        return shippingMethodService.getAllShippingMethods();
    }
}