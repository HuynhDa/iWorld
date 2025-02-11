// src/components/Footer.js
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <Container>
        <Row>
          <Col md={4} className="text-center">
            <h5>Về Chúng Tôi</h5>
            <p>Apple Electronics Store là cửa hàng bán lẻ chính thức của Apple tại Việt Nam, chuyên cung cấp các sản phẩm điện tử cao cấp và phụ kiện chính hãng của Apple.</p>
          </Col>

          <Col md={4} className="text-center">
            <h5>Liên Kết Nhanh</h5>
            <Nav className="flex-column">
              <Nav.Link href="/" className="text-white">Trang Chủ</Nav.Link>
              <Nav.Link href="/product" className="text-white">Sản Phẩm</Nav.Link>
              <Nav.Link href="/about" className="text-white">Giới Thiệu</Nav.Link>
              <Nav.Link href="/contact" className="text-white">Liên Hệ</Nav.Link>
              <Nav.Link href="/privacy-policy" className="text-white">Chính Sách Bảo Mật</Nav.Link>
            </Nav>
          </Col>

          <Col md={4} className="text-center">
            <h5>Thông Tin Liên Hệ</h5>
            <p><strong>Địa Chỉ:</strong> 123 Apple Street, Quận 1, TP.HCM</p>
            <p><strong>Điện Thoại:</strong> +84 123 456 789</p>
            <p><strong>Email:</strong> info@appleelectronicstore.com</p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <p>&copy; 2025 Apple Electronics Store. All rights reserved.</p>
            <p>Follow us on:</p>
            <Nav>
              <Nav.Link href="https://facebook.com" target="_blank" className="text-white">Facebook</Nav.Link>
              <Nav.Link href="https://twitter.com" target="_blank" className="text-white">Twitter</Nav.Link>
              <Nav.Link href="https://instagram.com" target="_blank" className="text-white">Instagram</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
