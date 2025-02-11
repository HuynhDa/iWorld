import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/registerForm.css"; // Import file CSS cho form

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // Thêm state cho lỗi

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setIsValid(false);
      setErrorMessage("Mật khẩu không khớp!");
      return;
    }

    const registerData = {
      name: name,
      email: email,
      password: password,
      phoneNumber: "0123456789", // Số điện thoại mặc định hoặc từ form
    };

    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Email đã tồn tại hoặc thông tin không hợp lệ.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Đăng ký thành công:", data);
        alert("Đăng ký thành công!");
        // Điều hướng về trang login
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Lỗi đăng ký:", error);
        setErrorMessage("Đăng ký thất bại. Vui lòng thử lại.");
      });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Form
            onSubmit={handleSubmit}
            className="shadow-lg p-4 rounded register-form"
          >
            <h3 className="text-center mb-4">Đăng Ký</h3>

            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!isValid}
              />
              <Form.Control.Feedback type="invalid">
                Email không hợp lệ.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Label>Tên Người Dùng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên người dùng"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Tên người dùng không được để trống
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!isValid}
              />
              <Form.Control.Feedback type="invalid">
                Mật khẩu phải có ít nhất 8 ký tự.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mb-4">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={!isValid}
              />
              <Form.Control.Feedback type="invalid">
                Mật khẩu không khớp.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Đăng Ký
            </Button>

            <div className="text-center mt-3">
              <p>
                Đã có tài khoản? <a href="/login">Đăng nhập</a>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
