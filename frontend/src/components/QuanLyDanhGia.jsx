// src/components/ReviewManagement.js
import React, { useState } from 'react';
import Admin from './Admin'; 
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

const QuanLyDanhGia = () => {
  // Dữ liệu mẫu cho danh sách đánh giá
  const reviews = [
    { id: 1, product: 'Sách Lịch Sử', user: 'Nguyễn Văn A', rating: 4, comment: 'Sách rất hay và bổ ích!' },
    { id: 2, product: 'Sách Văn Học', user: 'Trần Thị B', rating: 5, comment: 'Một cuốn sách tuyệt vời!' },
    { id: 3, product: 'Sách Khoa Học', user: 'Lê Minh C', rating: 3, comment: 'Sách khá hay nhưng hơi khó hiểu.' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [editReview, setEditReview] = useState(null);

  const handleShowModal = (review) => {
    setEditReview(review);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditReview(null);
  };

  const handleSaveChanges = () => {
    // Thực hiện lưu thay đổi vào cơ sở dữ liệu hoặc state
    handleCloseModal();
  };

  const handleDeleteReview = (id) => {
    // Xử lý xóa đánh giá
    alert(`Đánh giá với ID ${id} đã bị xóa`);
  };

  return (
    <Admin>
      <Container>
        <Row className="my-4">
          <Col>
            <h3 className="text-center">Quản Lý Đánh Giá</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sản Phẩm</th>
                  <th>Người Dùng</th>
                  <th>Đánh Giá</th>
                  <th>Nhận Xét</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td>{review.product}</td>
                    <td>{review.user}</td>
                    <td>{review.rating} / 5</td>
                    <td>{review.comment}</td>
                    <td>
                      <Button variant="warning" onClick={() => handleShowModal(review)} className="me-2">
                        <FaPen />
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteReview(review.id)}>
                        <FaTrashAlt />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* Modal chỉnh sửa đánh giá */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editReview ? 'Chỉnh Sửa Đánh Giá' : 'Thêm Mới Đánh Giá'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="reviewProduct">
              <Form.Label>Sản Phẩm</Form.Label>
              <Form.Control type="text" placeholder="Nhập tên sản phẩm" defaultValue={editReview ? editReview.product : ''} />
            </Form.Group>
            <Form.Group controlId="reviewUser" className="mt-3">
              <Form.Label>Người Dùng</Form.Label>
              <Form.Control type="text" placeholder="Nhập tên người dùng" defaultValue={editReview ? editReview.user : ''} />
            </Form.Group>
            <Form.Group controlId="reviewRating" className="mt-3">
              <Form.Label>Đánh Giá</Form.Label>
              <Form.Control as="select" defaultValue={editReview ? editReview.rating : '1'}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="reviewComment" className="mt-3">
              <Form.Label>Nhận Xét</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Nhập nhận xét" defaultValue={editReview ? editReview.comment : ''} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Lưu Thay Đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </Admin>
  );
};

export default QuanLyDanhGia;
