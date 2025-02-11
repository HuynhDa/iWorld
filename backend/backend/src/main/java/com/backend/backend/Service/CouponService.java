package com.backend.backend.Service;

import com.backend.backend.DTO.CouponDTO;
import java.util.List;

public interface CouponService {
    List<CouponDTO> getAllCoupons();
    CouponDTO createCoupon(CouponDTO couponDTO);
    void deleteCoupon(Integer id); 
}
