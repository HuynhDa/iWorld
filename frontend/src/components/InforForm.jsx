// src/components/Admin.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Card, Button, Alert } from 'react-bootstrap';
import { FaChartBar, FaBox, FaUsers, FaComments, FaFileInvoiceDollar } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Đảm bảo bạn đã import 'react-toastify'


const Infor = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [showAlert, setShowAlert] = useState(false); // State for controlling alert visibility


  return (
    <Container fluid className="bg-light min-vh-100">
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white p-2" style={{ minHeight: '100vh' }}>
          <h4 className="text-center mb-5 mt-3">Admin Panel</h4>
          <Nav variant="pills" className="flex-column">
            <Nav.Item className="mb-5">
              <Link to="/ThongKeDoanhThu" className="nav-link text-white" style={{ fontWeight: 'bold' }}>
                <FaChartBar className="me-2" /> Thống Kê Doanh Thu
              </Link>
            </Nav.Item>
            <Nav.Item className="mb-5">
              <Link to="/QuanLySanPham" className="nav-link text-white" style={{ fontWeight: 'bold' }}>
                <FaBox className="me-2" /> Quản Lý Sản Phẩm
              </Link>
            </Nav.Item>
            <Nav.Item className="mb-5">
              <Link to="/QuanLyNguoiDung" className="nav-link text-white" style={{ fontWeight: 'bold' }}>
                <FaUsers className="me-2" /> Quản Lý Người Dùng
              </Link>
            </Nav.Item>
            <Nav.Item className="mb-5">
              <Link to="/QuanLyDanhGia" className="nav-link text-white" style={{ fontWeight: 'bold' }}>
                <FaComments className="me-2" /> Quản Lý Đánh Giá
              </Link>
            </Nav.Item>
            <Nav.Item className="mb-5">
              <Link to="/QuanLyDonHang" className="nav-link text-white" style={{ fontWeight: 'bold' }}>
                <FaFileInvoiceDollar className="me-2" /> Quản Lý Đơn Hàng
              </Link>
            </Nav.Item>
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          {/* Show alert if user is role 1 */}
          {showAlert && (
            <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
              <Alert.Heading>Warning!</Alert.Heading>
              <p>You do not have permission to access the Admin Panel. You are redirected to a different page.</p>
            </Alert>
          )}

          {/* Chỉ hiển thị phần Tổng Quan Hệ Thống khi không ở các trang quản lý */}
          {location.pathname === '/admin' && (
            <Row className="mb-4">
              <Col md={12}>
                <h3 className="text-center">Tổng Quan Hệ Thống</h3>
              </Col>
            </Row>
          )}
          {location.pathname === '/admin' && (
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Doanh Thu Hôm Nay</Card.Title>
                    <Card.Text>10.000.000 VNĐ</Card.Text>
                    <Button variant="primary" className="w-100">Xem Chi Tiết</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Sản Phẩm Đã Bán</Card.Title>
                    <Card.Text>200 Sản Phẩm</Card.Text>
                    <Button variant="primary" className="w-100">Xem Chi Tiết</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Số Lượng Người Dùng</Card.Title>
                    <Card.Text>1500 Người Dùng</Card.Text>
                    <Button variant="primary" className="w-100">Xem Chi Tiết</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Infor;
