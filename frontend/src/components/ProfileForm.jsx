import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaBox,
} from "react-icons/fa";
import { BiSolidCoupon } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import "./styles/ProfileForm.css";

const ProfileForm = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="loading-message">Đang tải thông tin người dùng...</div>
    );
  }

  return (
    <Container fluid className="bg-light min-vh-100">
      <Row>
        {/* Sidebar */}
        <Col
          md={2}
          className="bg-dark text-white p-2"
          style={{ minHeight: "100vh" }}
        >
          <h4 className="text-center mb-5 mt-3">Trang cá nhân</h4>
          <Nav variant="pills" className="flex-column">
            <Nav.Item className="mb-5">
              <Link
                to="/profile"
                className="nav-link text-white"
                style={{ fontWeight: "bold" }}
              >
                <FaChartBar className="me-2" /> Thông tin cá nhân
              </Link>
            </Nav.Item>
            <Nav.Item className="mb-5">
              <Link
                to="/QuanLyNguoiDung"
                className="nav-link text-white"
                style={{ fontWeight: "bold" }}
              >
                <BiSolidCoupon className="me-2" /> Kho Voucher
              </Link>
            </Nav.Item>
            <Nav.Item className="mb-5">
              <Link
                to="/profile"
                className="nav-link text-white"
                style={{ fontWeight: "bold" }}
              >
                <IoIosNotifications className="me-2" /> Thông báo 
              </Link>
            </Nav.Item>
            <Nav.Item className="mb-5">
              <Link
                to="/profile"
                className="nav-link text-white"
                style={{ fontWeight: "bold" }}
              >
                <FaBox className="me-2" /> Đơn Hàng của tôi
              </Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={10} className="p-4">
        <Card className="profile-card">
          <Card.Body>
            <h3 className="text-center profile-title">Thông Tin Cá Nhân</h3>
            <hr />
            <div className="profile-item">
              <strong>Tên:</strong> <span>{user.name}</span>
            </div>
            <div className="profile-item">
              <strong>Email:</strong> <span>{user.email}</span>
            </div>
            <div className="profile-item">
              <strong>Mật khẩu:</strong> <span>******</span>
            </div>
            <div className="profile-item">
              <strong>Số điện thoại:</strong> <span>{user.phoneNumber}</span>
            </div>
            <div className="profile-item">
              <strong>Địa chỉ:</strong> <span>{user.address}</span>
            </div>
            <hr />
            <Button
              variant="dark"
              className="btn-logout w-100"
              onClick={handleLogout}
            >
              Đăng Xuất
            </Button>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileForm;
