package com.backend.backend.Controller;

import com.backend.backend.DTO.PaymentMethodDTO;
import com.backend.backend.Service.PaymentMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/payment-methods")
public class PaymentMethodController {

    @Autowired
    private PaymentMethodService paymentMethodService;


    @GetMapping
    public List<PaymentMethodDTO> getAllPaymentMethods() {
        return paymentMethodService.getAllPaymentMethods();
    }
}
