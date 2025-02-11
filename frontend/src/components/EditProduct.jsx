import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Admin from "./Admin";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
// import "./styles/EditProduct.css";

const EditProduct = () => {
  const [Name, setName] = useState("");
  const [Category, setCategory] = useState("");
  const [Price, setPrice] = useState("");
  const [TotailQuantity, setTotailQuantity] = useState("");
  const [Description, setDescription] = useState("");
  const [RamSize, setRamSize] = useState("");
  const [Chip, setChip] = useState("");
  const [StorageCapacity, setStorageCapacity] = useState("");
  const [Color, setColor] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  useEffect(() => {
    // Fetch product data based on ID
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((response) => {
        const productData = response.data;
        setProduct(productData);
        setName(productData.name);
        setCategory(productData.category?.name || "");
        setPrice(productData.productVersions?.[0]?.price || "");
        setTotailQuantity(
          productData.productVersions?.[0]?.totalQuantity || ""
        );
        setDescription(productData.description || "");
        setRamSize(productData.productVersions?.[0]?.ramSize || "");
        setChip(productData.productVersions?.[0]?.chip || "");
        setStorageCapacity(
          productData.productVersions?.[0]?.storageCapacity || ""
        );
        setColor(productData.productVersions?.[0]?.color || "");
        setProductImages(productData.productImages || []);
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu sản phẩm:", error);
      });
  }, [id]);

  const handleSaveChanges = (event) => {
    event.preventDefault();

    // Validation checks
    if (!Name) {
      toast.error("Tên sản phẩm không được để trống!");
      return;
    }
    if (!Chip) {
      toast.error("Chip không được để trống!");
      return;
    }
    if (!TotailQuantity) {
      toast.error("Số lượng tổng sản phẩm không được để trống!");
      return;
    }
    if (!StorageCapacity) {
      toast.error("Dung lượng lưu trữ không được để trống!");
      return;
    }
    if (!Category) {
      toast.error("Danh mục không được để trống!");
      return;
    }
    if (!Price) {
      toast.error("Giá không được để trống!");
      return;
    }
    if (!Color) {
      toast.error("Màu sắc không được để trống!");
      return;
    }
    if (!Description) {
      toast.error("Mô tả sản phẩm không được để trống!");
      return;
    }

    const formData = new FormData();
    formData.append(
      "productDTO",
      new Blob(
        [
          JSON.stringify({
            name: Name,
            category: { name: Category },
            description: Description,
            productVersions: [
              {
                id: product.id,
                price: Price,
                totalQuantity: TotailQuantity,
                ramSize: RamSize,
                chip: Chip,
                storageCapacity: StorageCapacity,
                color: Color,
              },
            ],
            imagesToDelete: imagesToDelete.map((image) => image.id),
          }),
        ],
        { type: "application/json" }
      )
    );

    // Append new images if there are any
    if (newImages.length > 0) {
      Array.from(newImages).forEach((file) => {
        formData.append("images", file);
      });
    }

    axios
      .put(`http://localhost:8080/api/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Sản phẩm đã được cập nhật thành công:", response.data);
        toast.success("Sản phẩm đã được cập nhật thành công!");
        navigate("/QuanLySanPham"); // Điều hướng trở lại trang quản lý sản phẩm
      })
      .catch((error) => {
        setSuccess(false);
        toast.error("Có lỗi khi nhập sản phẩm.");
      });
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setNewImages(files);
  };

  const handleDeleteImage = (index) => {
    const imageToDelete = productImages[index];
    setImagesToDelete((prevImages) => [...prevImages, imageToDelete]);
    setProductImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Admin>
      <Container>
        <Row className="my-4">
          <Col xs={12}>
            <h3 className="text-center">Chỉnh Sửa Sản Phẩm</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={8} lg={10} className="mx-auto">
            <Form onSubmit={handleSaveChanges} className="form-modern">
              <Row>
                <Col md={6}>
                  {/* Tên sản phẩm */}
                  <Form.Group controlId="editName" className="mb-4">
                    <Form.Label className="custom-label">
                      Tên Sản Phẩm
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập tên sản phẩm"
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-modern"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Danh mục */}
                  <Form.Group controlId="editCategory" className="mb-4">
                    <Form.Label className="custom-label">Danh Mục</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập danh mục"
                      value={Category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="input-modern"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {/* Giá */}
                  <Form.Group controlId="editPrice" className="mb-4">
                    <Form.Label className="custom-label">Giá (VNĐ)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Nhập giá"
                      value={Price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="input-modern"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Số lượng tồn */}
                  <Form.Group controlId="editTotailQuantity" className="mb-4">
                    <Form.Label className="custom-label">
                      Số Lượng Tồn
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Nhập số lượng tồn"
                      value={TotailQuantity}
                      onChange={(e) => setTotailQuantity(e.target.value)}
                      className="input-modern"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {/* RAM */}
                  <Form.Group controlId="editRamSize" className="mb-4">
                    <Form.Label className="custom-label">RAM</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập RAM"
                      value={RamSize}
                      onChange={(e) => setRamSize(e.target.value)}
                      className="input-modern"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Chip */}
                  <Form.Group controlId="editChip" className="mb-4">
                    <Form.Label className="custom-label">Chip</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập Chip"
                      value={Chip}
                      onChange={(e) => setChip(e.target.value)}
                      className="input-modern"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {/* Dung lượng lưu trữ */}
                  <Form.Group controlId="editStorage" className="mb-4">
                    <Form.Label className="custom-label">
                      Dung Lượng Lưu Trữ
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập dung lượng lưu trữ"
                      value={StorageCapacity}
                      onChange={(e) => setStorageCapacity(e.target.value)}
                      className="input-modern"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Màu sắc */}
                  <Form.Group controlId="editColor" className="mb-4">
                    <Form.Label className="custom-label">Màu Sắc</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập màu sắc"
                      value={Color}
                      onChange={(e) => setColor(e.target.value)}
                      className="input-modern"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {/* Hiển thị hình ảnh hiện tại */}
                <div className="current-images">
                  {productImages.map((image, index) => (
                    <div key={index} className="image-container">
                      <img
                        src={`http://localhost:8080${image.imageUrl}`}
                        alt={`Hình ảnh sản phẩm ${index + 1}`}
                        className="product-image-preview"
                      />
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteImage(index)}
                        className="delete-image-button"
                      >
                        <FaTimes />
                      </Button>
                    </div>
                  ))}
                </div>
                <Col md={12}>
                  {/* Hình ảnh */}
                  <Form.Group controlId="editProductImages" className="mb-4">
                    <Form.Label className="custom-label">Hình Ảnh</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="input-modern"
                    />
                    <Form.Text className="custom-form-text">
                      Chọn nhiều hình ảnh bằng cách giữ phím Ctrl (Windows) hoặc
                      Command (Mac).
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {/* Mô tả */}
                  <Form.Group controlId="editDescription" className="mb-4">
                    <Form.Label className="custom-label">Mô Tả</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Nhập mô tả sản phẩm"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="input-modern"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit" className="button-modern">
                Lưu Thay Đổi
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Admin>
  );
};

export default EditProduct;