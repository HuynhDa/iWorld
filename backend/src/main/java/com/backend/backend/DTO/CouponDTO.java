package com.backend.backend.DTO;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CouponDTO {

    private Integer id;

    private String code;

    private String discountPercentage;

    private Integer discountType;

    private LocalDateTime expiryDate;
}
