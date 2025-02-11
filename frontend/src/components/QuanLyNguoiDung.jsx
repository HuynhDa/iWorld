// src/components/UserManagement.js
import React, { useState } from 'react';
import Admin from './Admin'; // Import AdminLayout
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

const QuanLyNguoiDung = () => {
  // Dữ liệu mẫu cho danh sách người dùng
  const users = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', role: 'Admin', phone: '0123456789' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', role: 'User', phone: '0987654321' },
    { id: 3, name: 'Lê Minh C', email: 'leminhc@example.com', role: 'User', phone: '0912345678' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleShowModal = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser(null);
  };

  const handleSaveChanges = () => {
    // Thực hiện lưu thay đổi vào cơ sở dữ liệu hoặc state
    handleCloseModal();
  };

  const handleDeleteUser = (id) => {
    // Xử lý xóa người dùng
    alert(`Người dùng với ID ${id} đã bị xóa`);
  };

  return (
    <Admin>
      <Container>
        <Row className="my-4">
          <Col>
            <h3 className="text-center">Quản Lý Người Dùng</h3>
            <Button variant="primary" className="mb-3">Thêm Người Dùng</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Số Điện Thoại</th>
                  <th>Vai Trò</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button variant="warning" onClick={() => handleShowModal(user)} className="me-2">
                        <FaPen />
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
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

      {/* Modal chỉnh sửa người dùng */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editUser ? 'Chỉnh Sửa Người Dùng' : 'Thêm Mới Người Dùng'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="userName">
              <Form.Label>Tên Người Dùng</Form.Label>
              <Form.Control type="text" placeholder="Nhập tên người dùng" defaultValue={editUser ? editUser.name : ''} />
            </Form.Group>
            <Form.Group controlId="userEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Nhập email" defaultValue={editUser ? editUser.email : ''} />
            </Form.Group>
            <Form.Group controlId="userPhone" className="mt-3">
              <Form.Label>Số Điện Thoại</Form.Label>
              <Form.Control type="text" placeholder="Nhập số điện thoại" defaultValue={editUser ? editUser.phone : ''} />
            </Form.Group>
            <Form.Group controlId="userRole" className="mt-3">
              <Form.Label>Vai Trò</Form.Label>
              <Form.Control as="select" defaultValue={editUser ? editUser.role : 'User'}>
                <option>Admin</option>
                <option>User</option>
              </Form.Control>
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

export default QuanLyNguoiDung;
