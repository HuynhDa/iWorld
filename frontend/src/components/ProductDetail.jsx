import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Alert,
  Card,
  Image,
} from "react-bootstrap";
import axios from "axios";
import styles from "./styles/ProductDetail.module.css"; // Sử dụng CSS Modules
import AddToCartForm from "./AddToCartForm"; // Import AddToCartForm component

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  // Lấy userId từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setCurrentImage(response.data.productImages[0].imageUrl); // Set initial large image
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy dữ liệu sản phẩm:", error);
      });
  }, [id]);

  // const handleRatingChange = (e) => {
  //   setRating(e.target.value);
  // };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log("Đánh giá đã được gửi:", { rating, review });
    setFormSubmitted(true);
  };

  const handleThumbnailClick = (imageUrl) => {
    setCurrentImage(imageUrl); // Update the current large image
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className={`${styles.productDetail} mt-5`}>
      <Row>
        <Col md={6} className={styles.productImage}>
          <Image
            src={`http://localhost:8080${currentImage}`}
            alt="Product Main"
            className="img-fluid rounded mb-3"
          />
          <div id="slider-detail" className={styles.thumbnailSlider}>
            {product.productImages.map((image, index) => (
              <div key={index} className={styles.thumbnailItem}>
                <Image
                  src={`http://localhost:8080${image.imageUrl}`}
                  alt={`Product ${index + 1}`}
                  className="img-fluid rounded mb-2"
                  thumbnail
                  onClick={() => handleThumbnailClick(image.imageUrl)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
        </Col>
        <Col md={6} className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productPrice}>
            {product.productVersions[0].price.toLocaleString("vi-VN")}₫
          </p>
          <p className={styles.productDescription}>{product.description}</p>
          <h4 className={styles.productWeight}>
            Dung lượng: {product.productVersions[0].ramSize}
          </h4>
          <AddToCartForm
            userId={userId}
            productVersionId={product.productVersions[0].id}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>Thông số kỹ thuật</h3>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Bộ vi xử lý</td>
                <td>{product.productVersions[0].chip}</td>
              </tr>
              <tr>
                <td>Màn hình</td>
                <td>13 inch Retina</td>
              </tr>
              <tr>
                <td>Dung lượng lưu trữ</td>
                <td>{product.productVersions[0].ramSize}</td>
              </tr>
              <tr>
                <td>Camera</td>
                <td>HD</td>
              </tr>
              <tr>
                <td>Pin</td>
                <td>Up to 18 hours</td>
              </tr>
              <tr>
                <td>Hệ điều hành</td>
                <td>macOS</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Tính năng nổi bật</h3>
          <ul>
            <li>Thiết kế mỏng nhẹ chỉ 1.29 kg</li>
            <li>Màn hình Retina sắc nét</li>
            <li>Chip Apple M1 8 nhân mạnh mẽ</li>
            <li>Pin dùng đến 18 giờ</li>
          </ul>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Hỗ trợ và bảo hành</h3>
          <p>12 tháng bảo hành chính hãng</p>
          <p>Hỗ trợ 24/7 qua Apple Care</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3>Thông tin khác</h3>
          <Table bordered>
            <tbody>
              <tr>
                <td>Kích thước</td>
                <td>30.41 x 21.24 x 1.61 cm</td>
              </tr>
              <tr>
                <td>Trọng lượng</td>
                <td>1.29 kg</td>
              </tr>
              <tr>
                <td>Màu sắc</td>
                <td>{product.productVersions[0].color}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Form đánh giá */}
      <Row className="mt-4">
        <Col>
          <Card className={styles.card}>
            <Card.Header>
              <h3>Đánh giá sản phẩm</h3>
            </Card.Header>
            <Card.Body>
              {formSubmitted && (
                <Alert variant="success">Cảm ơn bạn đã gửi đánh giá!</Alert>
              )}
              <Form onSubmit={handleSubmitReview}>
                <Form.Group controlId="rating">
                  <Form.Label>Chấm điểm</Form.Label>
                  <div className={styles.ratingStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`${styles.star} ${
                          star <= rating ? styles.selected : ""
                        }`}
                        onClick={() => setRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </Form.Group>
                <Form.Group controlId="review" className="mt-3">
                  <Form.Label>Nhận xét</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    value={review}
                    onChange={handleReviewChange}
                    placeholder="Viết nhận xét của bạn ở đây..."
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">
                  Gửi đánh giá
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
