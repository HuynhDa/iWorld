import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'; // hoặc './App.css'
// Import các component
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Admin from "./components/Admin";
import ThongKeDoanhThu from "./components/ThongKeDoanhThu";
import QuanLySanPham from "./components/QuanLySanPham";
import QuanLyNguoiDung from "./components/QuanLyNguoiDung";
import QuanLyDanhGia from "./components/QuanLyDanhGia";
import QuanLyDonHang from "./components/QuanLyDonHang";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ProfileForm from "./components/ProfileForm";
import AddToCartForm from "./components/AddToCartForm";
import Voucher from "./components/Voucher";

const App = () => {
  // Dùng useState để theo dõi trạng thái đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />{" "}
      {/* Truyền isLoggedIn và setIsLoggedIn vào NavigationBar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
        />{" "}
        {/* Truyền setIsLoggedIn vào LoginForm */}
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/admin"
          element={<Admin setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/ThongKeDoanhThu" element={<ThongKeDoanhThu />} />
        <Route path="/QuanLySanPham" element={<QuanLySanPham />} />
        <Route path="/QuanLyNguoiDung" element={<QuanLyNguoiDung />} />
        <Route path="/QuanLyDanhGia" element={<QuanLyDanhGia />} />
        <Route path="/QuanLyDonHang" element={<QuanLyDonHang />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/addtocart" element={<AddToCartForm />} />
        <Route path="/Voucher" element={<Voucher />} />


      </Routes>
      {/* Đảm bảo ToastContainer chỉ xuất hiện một lần */}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        style={{ width: "600px" }}
        closeButton={false}
      />
      <Footer />
    </Router>
  );
};

export default App;
