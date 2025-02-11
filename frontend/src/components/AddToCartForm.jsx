import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddToCartForm = ({ userId, productVersionId }) => {
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productVersionId) {
      setError("Product version ID is required.");
      return;
    }

    const cartItemDTO = {
      productVersion: {
        id: productVersionId // Ensure this is not null
      },
      quantity: quantity,
    };

    axios
      .post(`http://localhost:8080/api/cart/${userId}/add`, cartItemDTO)
      .then((response) => {
        setSubmitted(true);
        setError(null);
        toast.success("Sản phẩm đã được thêm vào giỏ hàng");
      })
      .catch((error) => {
        setSubmitted(false);
        toast.error("Thêm vào giỏ hàng không thành công");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* {submitted && <Alert variant="success">Sản phẩm đã được thêm vào giỏ hàng!</Alert>} */}
      {/* {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="quantity">
        <Form.Label>Số lượng</Form.Label>
        <Form.Control
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
      </Form.Group> */}
      <Button variant="btn btn-dark" type="submit">
        Thêm vào giỏ hàng
      </Button>
    </Form>
  );
};

export default AddToCartForm;