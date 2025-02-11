package com.backend.backend.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderDTO {
    private Integer id; // ID đơn hàng
    private Integer userId; // Thông tin người dùng
    private Integer shippingAddressId; // ID địa chỉ giao hàng
    private Integer paymentMethodId; // ID phương thức thanh toán
    private Integer shippingMethodId; // ID phương thức giao hàng
    private Double totalAmount; // Tổng tiền
    private Integer coupon; // Mã giảm giá (có thể null)
    private Integer status; // Trạng thái đơn hàng (mặc định: 0 - Đang xử lý)
    private List<OrderItemDTO> orderItems; // Danh sách các sản phẩm trong đơn hàng
}
