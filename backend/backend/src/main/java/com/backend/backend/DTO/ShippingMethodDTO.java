package com.backend.backend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShippingMethodDTO {
    private Integer id;
    private String name;
    private String description;
    private Double shippingFee;
}