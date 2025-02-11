import React, { useState, useEffect } from "react";
import Admin from "./Admin";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const formatDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 3) {
    return "Invalid date";
  }

  const [year, month, day] = dateArray;
  const date = new Date(year, month - 1, day); // Tháng trong JavaScript bắt đầu từ 0 (0 = tháng 1)

  // Kiểm tra xem ngày hợp lệ không
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return format(date, "dd/MM/yyyy"); // Định dạng theo ý muốn
};

const getDiscountTypeLabel = (type) => {
  return type === 0 ? "Phần trăm" : "FreeShipping";
};

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [newVoucher, setNewVoucher] = useState({
    code: "",
    discountPercentage: "",
    discountType: "",
    expiryDate: "",
  });

  // Fetch vouchers from backend
  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/coupons");
        const data = await response.json();
        setVouchers(data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVoucher({ ...newVoucher, [name]: value });
  };

  // Handle adding a new voucher
  const handleAddVoucher = async (e) => {
    e.preventDefault();
    if (
      newVoucher.code &&
      newVoucher.discountPercentage &&
      newVoucher.expiryDate
    ) {
      const dateTime = newVoucher.expiryDate.includes("T")
        ? newVoucher.expiryDate
        : `${newVoucher.expiryDate}T00:00:00`;

      try {
        const response = await fetch("http://localhost:8080/api/addcoupons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newVoucher, expiryDate: dateTime }),
        });

        if (response.ok) {
          const addedVoucher = await response.json();
          setVouchers([...vouchers, addedVoucher]);
          setNewVoucher({
            code: "",
            discountPercentage: "",
            discountType: "",
            expiryDate: "",
          });
          toast.success("Tạo Voucher thành công!");
        } else {
          console.error("Failed to add voucher");
          toast.error("Tạo Voucher thất bại!");
        }
      } catch (error) {
        console.error("Error adding voucher:", error);
      }
    } else {
      toast.error("Bạn chưa điền đủ thông tin yêu cầu!");
    }
  };

  // Handle deleting a voucher
  const handleDeleteVoucher = async (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      text: "Bạn sẽ không thể khôi phục lại sản phẩm này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/deletecoupons/${id}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            setVouchers(vouchers.filter((voucher) => voucher.id !== id));
            toast.success("Xóa Voucher thành công!");
          } else {
            console.error("Failed to delete voucher");
            toast.error("Xóa Voucher thất bại!");
          }
        } catch (error) {
          console.error("Error deleting voucher:", error);
          toast.error("Đã xảy ra lỗi khi xóa Voucher!");
        }
      }
    });
  };

  return (
    <Admin>
      <Container fluid>
        <Row>
          <Col md={7}>
            <h3>Danh sách Voucher</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Hình thức giảm giá</th>
                  <th>Giảm giá</th>
                  <th>Ngày hết hạn</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher) => (
                  <tr key={voucher.id}>
                    <td>{voucher.code}</td>
                    <td>{getDiscountTypeLabel(voucher.discountType)}</td>
                    <td>{voucher.discountPercentage}</td>
                    <td>{formatDate(voucher.expiryDate)}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteVoucher(voucher.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Col md={5}>
            <h3>Tạo Voucher mới</h3>
            <Form onSubmit={handleAddVoucher}>
              <Form.Group className="mb-3" controlId="voucherCode">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập Code giảm giá"
                  name="code"
                  value={newVoucher.code}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="voucherDiscountType">
                <Form.Label>Hình thức giảm giá</Form.Label>
                <Form.Control
                  as="select"
                  name="discountType"
                  value={newVoucher.discountType}
                  onChange={handleChange}
                >
                  <option value="">Chọn hình thức giảm giá</option>
                  <option value="0">Phần trăm</option>
                  <option value="1">FreeShipping</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="voucherDiscountPercentage">
                <Form.Label>Giảm giá</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập giá trị giảm giá"
                  name="discountPercentage"
                  value={newVoucher.discountPercentage}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="voucherExpiration">
                <Form.Label>Ngày hết hạn giảm giá</Form.Label>
                <Form.Control
                  type="date"
                  name="expiryDate"
                  value={newVoucher.expiryDate}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Tạo Voucher
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Admin>
  );
};

export default Voucher;