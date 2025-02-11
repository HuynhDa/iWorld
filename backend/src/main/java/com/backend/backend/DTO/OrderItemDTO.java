package com.backend.backend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemDTO {
    private Integer id;
    private Integer productVersionId; // ID phiên bản sản phẩm
    private Integer quantity; // Số lượng
    private Double price; // Giá tiền cho mỗi sản phẩm
}
