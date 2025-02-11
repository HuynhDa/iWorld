import React, { useState, useEffect } from "react";
import { Container, Table, Button, Image, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./styles/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Lấy đối tượng user từ Local Storage
  const userId = user ? user.id : null; // Lấy userId từ đối tượng user
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/api/cart/${userId}`)
        .then((response) => {
          if (response.data && response.data.cartItems) {
            setCartItems(response.data.cartItems);
          } else {
            setCartItems([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, [userId]);

  const handleQuantityChange = (id, increment) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + increment) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      text: "Bạn sẽ không thể khôi phục lại sản phẩm này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        if (userId) {
          axios
            .delete(`http://localhost:8080/api/cart/${userId}/item/${id}`)
            .then((response) => {
              if (response.status === 204) {
                setCartItems((prevItems) =>
                  prevItems.filter((item) => item.id !== id)
                );
                Swal.fire(
                  "Đã xóa!",
                  "Sản phẩm đã được xóa khỏi giỏ hàng.",
                  "success"
                );
              } else {
                Swal.fire(
                  "Thất bại!",
                  "Không thể xóa sản phẩm khỏi giỏ hàng.",
                  "error"
                );
                console.error(`Failed to remove item with ID ${id}`);
              }
            })
            .catch((error) => {
              Swal.fire(
                "Lỗi!",
                "Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.",
                "error"
              );
              console.error("Error removing item from cart:", error);
            });
        }
      }
    });
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const total = Array.isArray(cartItems)
    ? cartItems
        .filter((item) => selectedItems.includes(item.id))
        .reduce(
          (sum, item) =>
            sum + (item.productVersion?.price || 0) * item.quantity,
          0
        )
    : 0;

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    if (itemsToCheckout.length === 0) {
      Swal.fire(
        "Thông báo",
        "Vui lòng chọn ít nhất một sản phẩm để thanh toán.",
        "warning"
      );
      return;
    }
    navigate("/checkout", { state: { itemsToCheckout } });
  };

  return (
    <div className="mt-5 cart-container">
      <h2 className="text-center">Giỏ Hàng</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="d-flex flex-column flex-lg-row">
          {/* Table Section */}
          <div className="table-container flex-grow-1">
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>Chọn</th>
                  <th>Hình ảnh</th>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng cộng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                      />
                    </td>
                    <td className="image-column">
                      <Image
                        src={`http://localhost:8080${item.productVersion?.imageUrl}`}
                        alt={item.productVersion?.name || "Unknown Product"}
                        fluid
                      />
                    </td>
                    <td>{item.productVersion?.name || "Unknown Product"}</td>
                    <td>
                      {item.productVersion?.price?.toLocaleString("vi-VN") ||
                        "N/A"}
                      ₫
                    </td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        <Button
                          variant="outline-dark"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="outline-dark"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>
                      {(
                        item.productVersion?.price * item.quantity
                      )?.toLocaleString("vi-VN") || "N/A"}
                      ₫
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="remove-button"
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Payment Button Section */}
          <div className="payment-section sticky-top d-flex flex-column align-items-center p-3 ml-lg-4 mt-4">
            <div className="total-amount mb-3">
              <h4>Tổng: {total.toLocaleString("vi-VN")}₫</h4>
            </div>
            <Button variant="dark" onClick={handleCheckout}>
              Tiến hành thanh toán
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;