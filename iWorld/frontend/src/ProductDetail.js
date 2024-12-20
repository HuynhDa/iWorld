import React from "react";
import { useParams, Link } from "react-router-dom";
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <img 
                    src={`https://via.placeholder.com/500`} 
                    alt={`Product ${id}`} 
                    className="card-img-top mb-4"
                />
                <div className="card-body">
                    <h3 className="card-title">Chi Tiết Sản Phẩm {id}</h3>
                    <p className="card-text">
                        Đây là thông tin chi tiết cho sản phẩm có mã số <strong>{id}</strong>. Nội dung cụ thể có thể được bổ sung sau.
                    </p>
                    <p className="price text-success">Giá: Liên hệ</p>
                    <Link to="/" className="btn btn-primary">Quay Về Trang Chủ</Link>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
