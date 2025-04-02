import React, { useState, useEffect } from "react";
import Admin from "./Admin";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import "./styles/QuanLySanPham.css";

const QuanLySanPham = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/quanlysanpham")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          setFilteredProducts(response.data);
        } else {
          console.error("Dữ liệu không hợp lệ", response.data);
        }
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu:", error);
      });
  }, []);

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      text: "Bạn sẽ không thể khôi phục lại sản phẩm này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/products/${id}`)
          .then((response) => {
            Swal.fire("Đã xóa!", "Sản phẩm đã được xóa thành công.", "success");
            setProducts(products.filter((product) => product.id !== id));
            setFilteredProducts(
              filteredProducts.filter((product) => product.id !== id)
            );
          })
          .catch((error) => {
            Swal.fire("Lỗi!", "Có lỗi khi xóa sản phẩm.", "error");
            console.error("Có lỗi khi xóa sản phẩm:", error);
          });
      }
    });
  };

  const handleEditProduct = (product) => {
    navigate(`/editproduct/${product.id}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterProducts(e.target.value, categoryFilter, priceFilter);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    filterProducts(searchTerm, e.target.value, priceFilter);
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
    filterProducts(searchTerm, categoryFilter, e.target.value);
  };

  const filterProducts = (search, category, price) => {
    let filteredList = products;

    if (search) {
      filteredList = filteredList.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredList = filteredList.filter(
        (product) => product.category?.name === category
      );
    }

    if (price) {
      const [minPrice, maxPrice] = price.split("-");
      filteredList = filteredList.filter(
        (product) =>
          product.productVersions[0].price >= minPrice &&
          product.productVersions[0].price <= maxPrice
      );
    }

    setFilteredProducts(filteredList);
  };

  return (
    <Admin>
      <Container fluid>
        <Row className="my-4">
          <Col xs={12}>
            <h3 className="text-center">Quản Lý Sản Phẩm</h3>
            <Link as={Link} to="/addproduct">
              <Button type="button" className="btn btn-secondary">
                Thêm sản phẩm mới
              </Button>
            </Link>
          </Col>
        </Row>

        <Row className="my-4">
          <Col xs={12} md={4}>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs={12} md={4}>
            <Form.Control
              as="select"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="">Tất cả sản phẩm</option>
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="MacBook">MacBook</option>
              <option value="AirPods">AirPods</option>
              <option value="Apple Watch">Apple Watch</option>
              <option value="Phụ kiện">Phụ kiện</option>
            </Form.Control>
          </Col>
          <Col xs={12} md={4}>
            <Form.Control
              as="select"
              value={priceFilter}
              onChange={handlePriceChange}
            >
              <option value="">Tất cả</option>
              <option value="0-5000000">0 - 5,000,000</option>
              <option value="5000000-10000000">5,000,000 - 10,000,000</option>
              <option value="10000000-20000000">10,000,000 - 20,000,000</option>
              <option value="20000000-50000000">20,000,000 - 50,000,000</option>
              <option value="50000000-100000000">
                50,000,000 - 100,000,000
              </option>
            </Form.Control>
          </Col>
        </Row>

        <Row>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col key={product.id} md={4} className="mb-4">
                <div className="product-details p-4 border rounded d-flex" 
                style={{ backgroundColor: "#f8f9fa", height: "300px" }}>
                  {/* Hình ảnh bên trái */}
                  <div className="product-image me-3">
                    {product.productImages?.length > 0 ? (
                      <img
                        src={`http://localhost:8080${product.productImages[0].imageUrl}`}
                        alt={product.name}
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          backgroundColor: "#f0f0f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        No Image
                      </div>
                    )}
                    <h5 className="text-center mt-4"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                    >{product.name}</h5>
                  </div>

                  {/* Thông tin bên phải */}
                  <div className="product-info">
                    
                    <p>
                      <strong>Danh Mục:</strong>{" "}
                      {product.category ? product.category.name : "N/A"}
                    </p>
                    <p>
                      <strong>Giá:</strong>{" "}
                      {product.productVersions &&
                      product.productVersions.length > 0 &&
                      product.productVersions[0].price &&
                      !isNaN(product.productVersions[0].price)
                        ? product.productVersions[0].price.toLocaleString(
                            "vi-VN"
                          )
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Số Lượng Tồn:</strong>{" "}
                      {product.productVersions &&
                      product.productVersions.length > 0
                        ? product.productVersions[0].totalQuantity
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Phiên Bản:</strong>{" "}
                      {product.productVersions &&
                      product.productVersions.length > 0
                        ? product.productVersions[0].storageCapacity
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Ram:</strong>{" "}
                      {product.productVersions &&
                      product.productVersions.length > 0
                        ? product.productVersions[0].ramSize
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Chip:</strong>{" "}
                      {product.productVersions &&
                      product.productVersions.length > 0
                        ? product.productVersions[0].chip
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="warning"
                    onClick={() => handleEditProduct(product)}
                    className="me-2"
                  >
                    <FaPen />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FaTrashAlt />
                  </Button>
                </div>
              </Col>
            ))
          ) : (
            <Col>
              <div className="text-center">Không có sản phẩm nào</div>
            </Col>
          )}
        </Row>
      </Container>
    </Admin>
  );
};

export default QuanLySanPham;
