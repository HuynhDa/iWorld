package com.backend.backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.DTO.OrderDTO;
import com.backend.backend.Entity.Order;
import com.backend.backend.Service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Order>> getOrderByUserId(@PathVariable Integer userId) {
        List<Order> order = orderService.getOrderByUserId(userId);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/checkout/{userId}")
    public ResponseEntity<Order> addOrder(
            @PathVariable Integer userId,
            @RequestBody OrderDTO orderDTO) {
        Order order = orderService.addOrder(orderDTO, userId);
        return ResponseEntity.ok(order);
    }
}
