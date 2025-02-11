package com.backend.backend.Service;

import com.backend.backend.DTO.PaymentMethodDTO;
import java.util.List;

public interface PaymentMethodService {
    List<PaymentMethodDTO> getAllPaymentMethods();
}