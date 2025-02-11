package com.backend.backend.Service.Impl;

import com.backend.backend.DTO.CouponDTO;
import com.backend.backend.Entity.Coupon;
import com.backend.backend.Repository.CouponRepository;
import com.backend.backend.Service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CouponServiceImpl implements CouponService {

    @Autowired
    private CouponRepository couponRepository;

    @Override
    public List<CouponDTO> getAllCoupons() {
        List<Coupon> coupons = couponRepository.findAll();
        return coupons.stream().map(coupon -> {
            CouponDTO dto = new CouponDTO();
            dto.setId(coupon.getId());
            dto.setCode(coupon.getCode());
            dto.setDiscountPercentage(coupon.getDiscountPercentage());
            dto.setDiscountType(coupon.getDiscountType());
            dto.setExpiryDate(coupon.getExpiryDate());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public CouponDTO createCoupon(CouponDTO couponDTO) {
        Coupon coupon = new Coupon();
        coupon.setCode(couponDTO.getCode());
        coupon.setDiscountPercentage(couponDTO.getDiscountPercentage());
        coupon.setDiscountType(couponDTO.getDiscountType());
        coupon.setExpiryDate(couponDTO.getExpiryDate());
        Coupon savedCoupon = couponRepository.save(coupon);
        couponDTO.setId(savedCoupon.getId());
        return couponDTO;
    }

    @Override
    public void deleteCoupon(Integer id) { // Implement this method
        couponRepository.deleteById(id);
    }
}
