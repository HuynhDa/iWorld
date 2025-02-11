import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Form,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import "./styles/Navbar.css";

const NavigationBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Tìm kiếm:", searchTerm);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công!");
    console.log("Đã đăng xuất");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";
  const isAdminPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/QuanLySanPham") ||
    location.pathname.startsWith("/ThongKeDoanhThu");

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand
          as={Link}
          to={isAdminPage ? "/admin" : "/"}
          className="custom-brand"
        >
          iWorld
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto custom-nav-links">
            {!isAdminPage && (
              <>
                <Nav.Link
                  as={Link}
                  to={isAdminPage ? "/admin" : "/"}
                  className="custom-nav-link"
                >
                  Trang Chủ
                </Nav.Link>
                <Nav.Link href="/product" className="custom-nav-link">
                  Sản Phẩm
                </Nav.Link>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-basic"
                    className="custom-nav-link"
                  >
                    Danh Mục Sản Phẩm
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#laptop">Laptop</Dropdown.Item>
                    <Dropdown.Item href="#smartphone">Điện Thoại</Dropdown.Item>
                    <Dropdown.Item href="#tablet">Máy Tính Bảng</Dropdown.Item>
                    <Dropdown.Item href="#accessory">Phụ Kiện</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>

          {!isAdminPage && (
            <Form className="d-flex search" onSubmit={handleSearchSubmit}>
              <FormControl
                type="text"
                placeholder="Tìm kiếm..."
                className="mr-sm-2 custom-search-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button type="submit" className="custom-button-search">
                <FaSearch />
              </Button>
            </Form>
          )}

          <Nav>
            {!isLoginPage && isLoggedIn ? (
              <>
                {!isAdminPage && (
                  <>
                    <Nav.Link as={Link} to="/profile">
                      <FaUserCircle size={24} className="custom-icon" />
                    </Nav.Link>
                    <Nav.Link as={Link} to="/cart">
                      <FaShoppingCart size={24} className="custom-icon" />
                    </Nav.Link>
                  </>
                )}
                <NavLink as={Link} to="/">
                  <Button className="custom-button mt-1" onClick={handleLogout}>
                    Đăng Xuất
                  </Button>
                </NavLink>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button
                    className="custom-button"
                    onClick={() => setIsLoggedIn(true)}
                  >
                    Đăng Nhập
                  </Button>
                </Nav.Link>

                <Nav.Link as={Link} to="/register">
                  <Button className="custom-button">Đăng Ký</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
