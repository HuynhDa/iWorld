import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Tạo file CSS nếu cần tùy chỉnh thêm
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">iWorld</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/product">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <Link to="/login" className="btn btn-light btn-sm me-2">
                            Đăng nhập
                        </Link>
                        <Link to="/register" className="btn btn-outline-light btn-sm">
                            Đăng ký
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
