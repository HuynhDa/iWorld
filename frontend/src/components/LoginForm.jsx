import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify'; // Đảm bảo bạn đã import 'react-toastify'
import './styles/loginForm.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = { email, password };

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (!response.ok) {
          setErrorMessage("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
          toast.error("Đăng nhập thất bại!"); // Hiển thị thông báo lỗi
          throw new Error("Đăng nhập thất bại.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Đăng nhập thành công:", data);
        localStorage.setItem("user", JSON.stringify(data));

        // Kiểm tra role để điều hướng đến trang phù hợp
        if (data.role === 0) {
          navigate("/admin");
        } else if (data.role === 1) {
          navigate("/");
        }

        // Cập nhật trạng thái đăng nhập
        setIsLoggedIn(true); 
        toast.success("Đăng nhập thành công!"); // Thông báo thành công
      })
      .catch((error) => {
        console.error("Lỗi đăng nhập:", error);
      });
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <div className="login-card shadow-lg p-4 rounded">
            <h3 className="text-center mb-4">Đăng Nhập</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 btn-login">
                Đăng Nhập
              </Button>

              {errorMessage && (
                <p className="text-danger text-center mt-2">{errorMessage}</p>
              )}

              <div className="text-center mt-3">
                <p>
                  Chưa có tài khoản?{" "}
                  <a href="/register" className="text-primary">
                    Đăng ký
                  </a>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
