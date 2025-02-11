package com.backend.backend.DTO;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class PaymentMethodDTO {
    private Integer id;
    private String name;
    private String description;
}
