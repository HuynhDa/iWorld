// src/components/OrderManagement.js
import React, { useState } from 'react';
import Admin from './Admin'; // Import AdminLayout
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

const QuanLyDonHang = () => {
  // Dữ liệu mẫu cho đơn hàng
  const orders = [
    { id: 1, customer: 'Nguyễn Văn A', status: 'Đang xử lý', total: 1500000, createdAt: '2025-01-01' },
    { id: 2, customer: 'Trần Thị B', status: 'Đã giao', total: 2000000, createdAt: '2025-01-03' },
    { id: 3, customer: 'Lê Minh C', status: 'Đang xử lý', total: 1200000, createdAt: '2025-01-04' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  const handleShowModal = (order) => {
    setEditOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditOrder(null);
  };

  const handleSaveChanges = () => {
    // Thực hiện lưu thay đổi vào cơ sở dữ liệu hoặc state
    handleCloseModal();
  };

  const handleDeleteOrder = (id) => {
    // Xử lý xóa đơn hàng
    alert(`Đơn hàng với ID ${id} đã bị xóa`);
  };

  const handleChangeStatus = (id, newStatus) => {
    // Cập nhật trạng thái đơn hàng
    alert(`Trạng thái đơn hàng với ID ${id} đã được thay đổi thành ${newStatus}`);
  };

  return (
    <Admin>
      <Container>
        <Row className="my-4">
          <Col>
            <h3 className="text-center">Quản Lý Đơn Hàng</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Mã Đơn Hàng</th>
                  <th>Khách Hàng</th>
                  <th>Tổng Tiền (VNĐ)</th>
                  <th>Ngày Tạo</th>
                  <th>Trạng Thái</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.total.toLocaleString('vi-VN')}</td>
                    <td>{order.createdAt}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                      >
                        <option value="Đang xử lý">Đang xử lý</option>
                        <option value="Đã giao">Đã giao</option>
                        <option value="Đã hủy">Đã hủy</option>
                      </select>
                    </td>
                    <td>
                      <Button variant="warning" onClick={() => handleShowModal(order)} className="me-2">
                        <FaPen />
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteOrder(order.id)}>
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

      {/* Modal chỉnh sửa đơn hàng */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editOrder ? 'Chỉnh Sửa Đơn Hàng' : 'Thêm Mới Đơn Hàng'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="orderCustomer">
              <Form.Label>Khách Hàng</Form.Label>
              <Form.Control type="text" placeholder="Nhập tên khách hàng" defaultValue={editOrder ? editOrder.customer : ''} />
            </Form.Group>
            <Form.Group controlId="orderTotal" className="mt-3">
              <Form.Label>Tổng Tiền</Form.Label>
              <Form.Control type="number" placeholder="Nhập tổng tiền" defaultValue={editOrder ? editOrder.total : ''} />
            </Form.Group>
            <Form.Group controlId="orderStatus" className="mt-3">
              <Form.Label>Trạng Thái</Form.Label>
              <Form.Control as="select" defaultValue={editOrder ? editOrder.status : 'Đang xử lý'}>
                <option>Đang xử lý</option>
                <option>Đã giao</option>
                <option>Đã hủy</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="orderCreatedAt" className="mt-3">
              <Form.Label>Ngày Tạo</Form.Label>
              <Form.Control type="date" defaultValue={editOrder ? editOrder.createdAt : ''} />
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

export default QuanLyDonHang;
