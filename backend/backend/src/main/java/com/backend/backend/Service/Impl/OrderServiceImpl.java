// package com.backend.backend.Service.Impl;

// import java.util.List;
// import java.util.stream.Collectors;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.backend.backend.DTO.OrderDTO;
// import com.backend.backend.DTO.OrderItemDTO;
// import com.backend.backend.Entity.Coupon;
// import com.backend.backend.Entity.Order;
// import com.backend.backend.Entity.OrderItem;
// import com.backend.backend.Entity.PaymentMethod;
// import com.backend.backend.Entity.ProductVersion;
// import com.backend.backend.Entity.ShippingAddress;
// import com.backend.backend.Entity.ShippingMethod;
// import com.backend.backend.Entity.User;
// import com.backend.backend.Repository.CouponRepository;
// import com.backend.backend.Repository.OrderRepository;
// import com.backend.backend.Repository.PaymentMethodRepository;
// import com.backend.backend.Repository.ProductVersionRepository;
// import com.backend.backend.Repository.ShippingAddressRepository;
// import com.backend.backend.Repository.ShippingMethodRepository;
// import com.backend.backend.Repository.UserRepository;
// import com.backend.backend.Service.OrderService;

// @Service
// public class OrderServiceImpl implements OrderService {

//         @Autowired
//         private OrderRepository orderRepository;

//         @Autowired
//         private PaymentMethodRepository paymentMethodRepository;

//         @Autowired
//         private ShippingMethodRepository shippingMethodRepository;

//         @Autowired
//         private UserRepository userRepository;

//         @Autowired
//         private CouponRepository couponRepository;

//         @Autowired
//         private ProductVersionRepository productVersionRepository;

//         @Autowired
//         private ShippingAddressRepository shippingAddressRepository;

//         // Lấy danh sách toàn bộ Order và chuyển sang OrderDTO
//         public List<OrderDTO> getAllOrders() {
//                 List<Order> orders = orderRepository.findAll();

//                 return orders.stream().map(this::convertToDTO).collect(Collectors.toList());
//         }

//         // Chuyển đổi từ Order sang OrderDTO
//         private OrderDTO convertToDTO(Order order) {
//                 OrderDTO dto = new OrderDTO();
//                 dto.setId(order.getId());
//                 dto.setUserId(order.getUser() != null ? order.getUser().getId() : null);
//                 dto.setShippingAddressId(order.getShippingAddress() != null ? order.getShippingAddress().getId() : null);
//                 dto.setPaymentMethodId(order.getPaymentMethod() != null ? order.getPaymentMethod().getId() : null);
//                 dto.setShippingMethodId(order.getShippingMethod() != null ? order.getShippingMethod().getId() : null);
//                 dto.setTotalAmount(order.getTotalAmount());
//                 dto.setCoupon(order.getCoupon() != null ? order.getCoupon().getId() : null);
//                 dto.setStatus(order.getStatus());

//                 // Chuyển đổi danh sách OrderItem sang OrderItemDTO     
//                 List<OrderItemDTO> orderItems = order.getOrderItems().stream().map(this::convertToItemDTO)
//                                 .collect(Collectors.toList());
//                 dto.setOrderItems(orderItems);

//                 return dto;
//         }

//         // Chuyển đổi từ OrderItem sang OrderItemDTO
//         private OrderItemDTO convertToItemDTO(OrderItem orderItem) {
//                 OrderItemDTO itemDTO = new OrderItemDTO();
//                 itemDTO.setId(orderItem.getId());
//                 itemDTO.setProductId(orderItem.getProductId());
//                 itemDTO.setQuantity(orderItem.getQuantity());
//                 itemDTO.setPrice(orderItem.getPrice());
//                 return itemDTO;
//         }

//         @Override
//         public List<Order> getOrderByUserId(Integer userId) {
//                 return orderRepository.findByUserId(userId);
//         }

//         @Override
//         public Order addOrder(OrderDTO orderDTO, Integer userId) {
//                 User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
//                 if (orderDTO.getPaymentMethodId() == null) {
//                         throw new IllegalArgumentException("Payment Method ID must not be null");
//                 }
//                 if (orderDTO.getShippingMethodId() == null) {
//                         throw new IllegalArgumentException("Shipping Method ID must not be null");
//                 }
//                 if (orderDTO.getShippingAddressId() == null) {
//                         throw new IllegalArgumentException("Shipping Address ID must not be null");
//                 }
//                 if (orderDTO.getCoupon() == null) {
//                         throw new IllegalArgumentException("Coupon ID must not be null");
//                 }

//                 PaymentMethod paymentMethod = paymentMethodRepository.findById(orderDTO.getPaymentMethodId())
//                                 .orElseThrow(() -> new RuntimeException("Payment method not found"));
//                 ShippingMethod shippingMethod = shippingMethodRepository.findById(orderDTO.getShippingMethodId())
//                                 .orElseThrow(() -> new RuntimeException("Shipping method not found"));
//                 ShippingAddress shippingAddress = shippingAddressRepository.findById(orderDTO.getShippingAddressId())
//                                 .orElseThrow(() -> new RuntimeException("Shipping address not found"));
//                 Coupon coupon = couponRepository.findByCode(orderDTO.getCoupon()).orElse(null);

//                 Order order = new Order();
//                 order.setUser(user);
//                 order.setShippingAddress(shippingAddress);
//                 order.setPaymentMethod(paymentMethod);
//                 order.setShippingMethod(shippingMethod);
//                 order.setCoupon(coupon);

//                 double totalAmount = orderDTO.getTotalAmount(); // Sử dụng totalAmount từ OrderDTO
//                 if (totalAmount <= 0) {
//                         throw new IllegalArgumentException("Total amount must be greater than zero");
//                 }
//                 for (OrderItemDTO itemDTO : orderDTO.getOrderItems()) {
//                         ProductVersion productVersion = productVersionRepository.findById(itemDTO.getProductVersionId())
//                                         .orElseThrow(() -> new RuntimeException("Product version not found"));
//                         OrderItem orderItem = new OrderItem();
//                         orderItem.setOrder(order);
//                         orderItem.setProductVersion(productVersion);
//                         orderItem.setQuantity(itemDTO.getQuantity());
//                         orderItem.setPrice(itemDTO.getPrice());
//                         totalAmount += itemDTO.getPrice() * itemDTO.getQuantity();
//                         order.getOrderItems().add(orderItem);
//                 }

//                 totalAmount += shippingMethod.getShippingFee();
//                 if (totalAmount > 99999999999999.99) { // Kiểm tra giới hạn giá trị
//                         throw new IllegalArgumentException("Total amount exceeds maximum allowed value");
//                 }

//                 order.setTotalAmount(totalAmount + shippingMethod.getShippingFee());
//                 return orderRepository.save(order);
//         }
// }