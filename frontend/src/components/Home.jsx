import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Carousel, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./styles/Home.css"; // Đảm bảo rằng tệp CSS đã được import

const Home = () => {
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Lấy sản phẩm bán chạy nhất
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/topselling")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTopSellingProducts(response.data);
        } else {
          console.error("Dữ liệu không hợp lệ", response.data);
        }
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu:", error);
      });
  }, []);

  // Lấy tất cả sản phẩm
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/quanlysanpham")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAllProducts(response.data);
        } else {
          console.error("Dữ liệu không hợp lệ", response.data);
        }
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu:", error);
      });
  }, []);

  return (
    <>
      {/* Slider */}
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="image/Investor Pitch Deck Presentation in Black Purple White Cool Corporate Style.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="image/Black and White Simple Monotone Brand Audit Presentation.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="image/Black and Gray Grunge Presentation.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      {/* Hiển thị sản phẩm bán chạy nhất */}
      <Container className="mt-5">
        <div className="sesion  shadow-sm">
          <div className="title">
            <h4 className="mb-4 text">Sản Phẩm Bán Chạy Nhất</h4>
          </div>
          <Row>
            {topSellingProducts.map((product) => (
              <Col md={4} key={product.id}>
                <Card className="product-card shadow-sm">
                <div className="discount-logo">
                    <img
                      src="image/png-png-urbanbrush-1709-removebg-preview.png" // Đường dẫn đến logo giảm giá
                      alt="Giảm giá"
                    />
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <Card.Img
                      variant="top"
                      src={`http://localhost:8080${
                        product.productImages[0]?.imageUrl ||
                        "/default-image.jpg"
                      }`}
                      alt={product.name}
                      className="card-img-top"
                    />
                    <Card.Body>
                      <Card.Title className="product-name">
                        {product.name}
                      </Card.Title>
                      <Card.Text className="product-price">
                        {product.productVersions &&
                        product.productVersions.length > 0 &&
                        product.productVersions[0].price &&
                        !isNaN(product.productVersions[0].price)
                          ? product.productVersions[0].price.toLocaleString(
                              "vi-VN"
                            )
                          : "N/A"}
                      </Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>

      {/* Hiển thị tất cả sản phẩm */}
      <Container className="mt-5">
        <h4 className="text-center mb-4">Tất Cả Sản Phẩm</h4>
        <Row>
          {allProducts.map((product) => (
            <Col md={4} key={product.id}>
              <Card className="product-card shadow-sm">
                <Link to={`/product/${product.id}`}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8080${
                      product.productImages[0]?.imageUrl || "/default-image.jpg"
                    }`}
                    alt={product.name}
                    className="card-img-top"
                  />
                  <Card.Body>
                    <Card.Title className="product-name">
                      {product.name}
                    </Card.Title>
                    <Card.Text className="product-price">
                      {product.productVersions &&
                      product.productVersions.length > 0 &&
                      product.productVersions[0].price &&
                      !isNaN(product.productVersions[0].price)
                        ? product.productVersions[0].price.toLocaleString(
                            "vi-VN"
                          )
                        : "N/A"}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
