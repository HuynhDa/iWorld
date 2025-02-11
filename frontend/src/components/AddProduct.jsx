import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Admin from "./Admin";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [storageCapacity, setStorageCapacity] = useState("");
  const [chip, setChip] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [ramSize, setRamSize] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    setUploadedImages([...e.target.files]);
  };

  const handleAddProduct = async () => {
    // Kiểm tra từng trường và hiển thị thông báo lỗi nếu bị bỏ trống
    if (!name) {
      toast.error("Tên sản phẩm không được để trống!");
      return;
    }
    if (!chip) {
      toast.error("Chip không được để trống!");
      return;
    }
    if (!totalQuantity) {
      toast.error("Số lượng tổng sản phẩm không được để trống!");
      return;
    }
    if (!ramSize) {
      toast.error("Dung lượng lưu trữ không được để trống!");
      return;
    }
    if (!category) {
      toast.error("Danh mục không được để trống!");
      return;
    }
    if (!price) {
      toast.error("Giá không được để trống!");
      return;
    }
    if (!color) {
      toast.error("Màu sắc không được để trống!");
      return;
    }
    if (!description) {
      toast.error("Mô tả sản phẩm không được để trống!");
      return;
    }

    const formData = new FormData();
    const productDTO = {
      name,
      description,
      brandName: "Apple",
      status: 1,
      createdAt: new Date(),
      category: { id: category },
      productVersions: [
        {
          storageCapacity,
          ramSize,
          chip,
          color,
          totalQuantity,
          price,
        },
      ],
    };

    formData.append(
      "productDTO",
      new Blob([JSON.stringify(productDTO)], { type: "application/json" })
    );
    for (let i = 0; i < uploadedImages.length; i++) {
      formData.append("images", uploadedImages[i], uploadedImages[i].name);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        toast.success("Thêm sản phẩm thành công!");
        navigate("/QuanLySanPham"); // Điều hướng trở lại trang quản lý sản phẩm
      }
    } catch (err) {
      console.error("Error response:", err.response);
      setError("Có lỗi xảy ra, vui lòng thử lại!");
      setSuccess(false);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <Admin>
      <Container>
        <div className="add-product-form">
          <h2>Thêm Mới Sản Phẩm</h2>

          <Form className="form-modern">
            {/* Tên sản phẩm */}
            <Form.Group controlId="addName" className="mb-4">
              <Form.Label>
                <strong>Tên Sản Phẩm</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên sản phẩm"
                className="input-modern"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            {/* Ram */}
            <Form.Group controlId="addStorageCapacity" className="mb-4">
              <Form.Label>
                <strong>Ram</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập Ram"
                className="input-modern"
                value={storageCapacity}
                onChange={(e) => setStorageCapacity(e.target.value)}
              />
            </Form.Group>

            {/* Chip */}
            <Form.Group controlId="addChip" className="mb-4">
              <Form.Label>
                <strong>Chip</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập Chip"
                className="input-modern"
                value={chip}
                onChange={(e) => setChip(e.target.value)}
              />
            </Form.Group>

            {/* Số lượng */}
            <Form.Group controlId="addTotalQuantity" className="mb-4">
              <Form.Label>
                <strong>Số Lượng tổng sản phẩm</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số lượng"
                className="input-modern"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(e.target.value)}
              />
            </Form.Group>

            {/* Dung lượng lưu trữ */}
            <Form.Group controlId="addRamSize" className="mb-4">
              <Form.Label>
                <strong>Dung Lượng Lưu Trữ</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập dung lượng lưu trữ"
                className="input-modern"
                value={ramSize}
                onChange={(e) => setRamSize(e.target.value)}
              />
            </Form.Group>

            {/* Danh mục sản phẩm */}
            <Row>
              <Col md={6}>
                <Form.Group controlId="addCategory" className="mb-4">
                  <Form.Label>
                    <strong>Danh Mục</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="input-modern"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="1">iPhone</option>
                    <option value="2">MacBook</option>
                    <option value="3">AirPods</option>
                    <option value="4">iPad</option>
                    <option value="5">Apple Watch</option>
                    <option value="6">Phụ kiện</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              {/* Giá */}
              <Col md={6}>
                <Form.Group controlId="addPrice" className="mb-4">
                  <Form.Label>
                    <strong>Giá (VNĐ)</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập giá sản phẩm"
                    className="input-modern"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Màu sắc */}
            <Form.Group controlId="addColor" className="mb-4">
              <Form.Label>
                <strong>Màu Sắc</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập màu sắc"
                className="input-modern"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group>

            {/* Hình ảnh */}
            <Form.Group controlId="addImages" className="mb-4">
              <Form.Label>
                <strong>Hình Ảnh</strong>
              </Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                className="input-modern"
                onChange={handleImageUpload}
              />
              <Form.Text className="text-muted">
                Chọn nhiều hình ảnh bằng cách giữ phím Ctrl (Windows) hoặc
                Command (Mac).
              </Form.Text>
            </Form.Group>

            {/* Mô tả sản phẩm */}
            <Form.Group controlId="addDescription" className="mb-4">
              <Form.Label>
                <strong>Mô Tả Sản Phẩm</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Nhập mô tả chi tiết sản phẩm"
                className="input-modern"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            {/* Nút thêm sản phẩm */}
            <Button
              variant="primary"
              onClick={handleAddProduct}
              className="button-modern"
            >
              Thêm Sản Phẩm
            </Button>
          </Form>

          {/* ToastContainer để hiển thị thông báo */}
          {/* <ToastContainer
            position="top-center"
            autoClose={1000}
            style={{ width: "600px" }}
            closeButton={false}
          /> */}
        </div>
      </Container>
    </Admin>
  );
};

export default AddProduct;
