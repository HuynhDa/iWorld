import React, { useState, useEffect } from "react";
import "./styles/Product.css"; 
import { Link } from "react-router-dom";
import { Container, Carousel, Row, Col, Card} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";



const Product = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/quanlysanpham")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Dữ liệu không hợp lệ", response.data);
        }
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu:", error);
      });
  }, []);


  const [filter, setFilter] = useState({
    name: "",
    minPrice: 0,
    maxPrice: 100,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      product.price >= filter.minPrice &&
      product.price <= filter.maxPrice
    );
  });

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Sản phẩm</h2>

      {/* Filter Form */}
      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <label htmlFor="name" className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Tìm theo tên sản phẩm"
            value={filter.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="minPrice" className="form-label">Giá tối thiểu</label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            className="form-control"
            placeholder="Min Giá"
            value={filter.minPrice}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="maxPrice" className="form-label">Giá tối đa</label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            className="form-control"
            placeholder="Max Giá"
            value={filter.maxPrice}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3 mb-2 d-flex align-items-end">
          <button className="btn btn-primary w-100">Lọc</button>
        </div>
      </div>

      {/* Product Grid */}
      <Row>
          {products.map((product) => (
            <Col md={4} key={product.id}>
              <Card className="product-card shadow-sm">
                <Link to={`/product/${product.id}`}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8080${product.productImages[0].imageUrl}`}
                    alt={product.name}
                    className="card-img-top"
                  />
                  <Card.Body>
                    <Card.Title className="product-name">{product.name}</Card.Title>
                    <Card.Text className="product-price">
                      {product.productVersions &&
                      product.productVersions.length > 0 &&
                      product.productVersions[0].price &&
                      !isNaN(product.productVersions[0].price)
                        ? product.productVersions[0].price.toLocaleString("vi-VN")
                        : "N/A"}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
    </div>
  );
};

export default Product;
