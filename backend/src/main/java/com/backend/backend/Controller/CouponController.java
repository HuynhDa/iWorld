package com.backend.backend.Controller;

import com.backend.backend.DTO.CouponDTO;
import com.backend.backend.Service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CouponController {

    @Autowired
    private CouponService couponService;

    @GetMapping("/coupons")
    public List<CouponDTO> getAllCoupons() {
        return couponService.getAllCoupons();
    }

    @PostMapping("/addcoupons")
    public CouponDTO createCoupon(@RequestBody CouponDTO couponDTO) {
        return couponService.createCoupon(couponDTO);
    }

    @DeleteMapping("/deletecoupons/{id}")
    public void deleteCoupon(@PathVariable Integer id) {
        couponService.deleteCoupon(id);
    }
}
