import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Modal,
  Spinner,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./styles/Checkout.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import biểu tượng xóa từ react-icons
import addressData from "./data/addressData.json";
import Select from "react-select"; // Import react-select

const Checkout = () => {
  const location = useLocation();
  const { itemsToCheckout } = location.state || { itemsToCheckout: [] };
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShippingFee, setSelectedShippingFee] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;
  const [showEditForm, setShowEditForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [editAddressId, setEditAddressId] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    specificAddress: "",
    paymentMethod: "",
    voucher: "",
    shippingMethodId: null,
  });

  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const calculateTotal = () => {
    let totalProductPrice = itemsToCheckout.reduce(
      (sum, item) => sum + item.productVersion.price * item.quantity,
      0
    );

    let totalAmount = totalProductPrice + selectedShippingFee;

    if (coupon) {
      if (coupon.discountType === 0) {
        // Nếu discountType là 0, áp dụng giảm giá phần trăm
        totalAmount -= (totalProductPrice * coupon.discountPercentage) / 100;
      } else if (coupon.discountType === 1) {
        // Nếu discountType là 1, miễn phí ship
        totalAmount -= selectedShippingFee;
      }
    }

    return totalAmount;
  };

  const handleSelectCoupon = (coupon) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      voucher: coupon.id.toString(),
    }));
    setCoupon(coupon); // Cập nhật giá trị coupon đã chọn
    setShowCouponModal(false); // Đóng modal sau khi chọn mã giảm giá
  };

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/shipping-methods"
        );
        setShippingMethods(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy phương thức giao hàng:", error);
      }
    };

    const fetchAvailableCoupons = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/coupons");
        setAvailableCoupons(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách mã giảm giá:", error);
      }
    };

    const fetchShippingAddress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/shipping-addresses/${userId}`
        );
        setShippingAddress(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy địa chỉ giao hàng:", error);
      }
    };

    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/payment-methods"
        );
        setPaymentMethods(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy phương thức thanh toán:", error);
      }
    };

    fetchAvailableCoupons();
    fetchPaymentMethods();
    fetchShippingMethods();
    fetchShippingAddress();
  }, [userId]);

  // Usage
  const totalAmount = calculateTotal();

  const handleVoucherChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, voucher: value });

    if (value) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/coupons/${value}`
        );
        setCoupon(response.data);
      } catch (error) {
        console.error("Lỗi khi áp dụng mã giảm giá:", error);
        setCoupon(null);
      }
    } else {
      setCoupon(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "shippingMethodId") {
      const selectedMethod = shippingMethods.find(
        (method) => method.id === parseInt(value)
      );
      setSelectedShippingFee(selectedMethod ? selectedMethod.shippingFee : 0);
    }

    setFormData({ ...formData, [name]: value });

    if (name === "province") {
      // Lọc danh sách quận/huyện khi thay đổi tỉnh
      const filteredDistricts = addressData
        .filter((item) => item.province === value)
        .map((item) => item.district)
        .filter((value, index, self) => self.indexOf(value) === index);
      setDistricts(filteredDistricts);
      setWards([]);
      setFormData({ ...formData, province: value, district: "", ward: "" });
    }

    if (name === "district") {
      // Lọc danh sách phường/xã khi thay đổi quận/huyện
      const filteredWards = addressData
        .filter((item) => item.district === value)
        .map((item) => item.ward)
        .filter((value, index, self) => self.indexOf(value) === index);
      setWards(filteredWards);
      setFormData({ ...formData, district: value, ward: "" });
    }
  };

  const handleProvinceChange = (selectedOption) => {
    setFormData({
      ...formData,
      province: selectedOption.value,
      district: "",
      ward: "",
    });

    // Lọc danh sách quận/huyện khi thay đổi tỉnh
    const filteredDistricts = addressData
      .filter((item) => item.province === selectedOption.value)
      .map((item) => ({ label: item.district, value: item.district }))
      .filter(
        (value, index, self) =>
          self.findIndex((v) => v.value === value.value) === index
      );

    setDistricts(filteredDistricts);
    setWards([]);
  };

  const handleDistrictChange = (selectedOption) => {
    setFormData({ ...formData, district: selectedOption.value, ward: "" });

    // Lọc danh sách phường/xã khi thay đổi quận/huyện
    const filteredWards = addressData
      .filter((item) => item.district === selectedOption.value)
      .map((item) => ({ label: item.ward, value: item.ward }))
      .filter(
        (value, index, self) =>
          self.findIndex((v) => v.value === value.value) === index
      );

    setWards(filteredWards);
  };

  const handleWardChange = (selectedOption) => {
    setFormData({ ...formData, ward: selectedOption.value });
  };

  const handleAddClick = () => {
    setShowEditForm(true);
    setEditAddressId(null); // ensure no address is being edited
    setFormData({
      name: "",
      phone: "",
      province: "",
      district: "",
      ward: "",
      specificAddress: "",
      paymentMethod: "",
      voucher: "",
      shippingMethodId: null,
    });
  };

  const handleEditClick = (address) => {
    setShowEditForm(true);
    setEditAddressId(address.id);
    setFormData({
      name: address.shippingName,
      phone: address.shippingPhone,
      shippingAddress: `${formData.specificAddress}, ${formData.ward}, ${formData.district}, ${formData.province}`,
    });
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.shippingMethodId) {
      toast.error("Vui lòng chọn phương thức giao hàng.");
      return;
    }
    if (!formData.paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán.");
      return;
    }

    const totalAmount = calculateTotal();
    if (totalAmount > 99999999999999.99) { // Kiểm tra giới hạn giá trị
      toast.error("Tổng số tiền vượt quá giá trị tối đa cho phép.");
      return;
    }
    
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;
    if (!userId) {
      toast.error("Vui lòng đăng nhập trước khi đặt hàng.");
      return;
    }

    const orderDTO = {
      userId: parseInt(userId, 10),
      shippingAddressId: formData.shippingAddress,
      paymentMethodId: formData.paymentMethod,
      shippingMethodId: formData.shippingMethodId,
      couponCode: formData.voucher,
      totalAmount: totalAmount,
      orderItems: itemsToCheckout.map((item) => ({
        productVersionId: item.productVersion.id,
        quantity: item.quantity,
        price: item.productVersion.price,
      })),
    };

    console.log("Order data:", orderDTO);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/orders/checkout/${userId}`,
        orderDTO
      );

      if (response.status === 200) {
        toast.success("Đặt hàng thành công!");
      } else {
        toast.error("Đặt hàng thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error("Đặt hàng thất bại, vui lòng thử lại.");
    }
};

  const handleSaveAddress = async () => {
    if (!formData.name) {
      toast.error("Vui lòng điền đầy đủ thông tin địa chỉ.");
      return;
    }
    if (!formData.phone) {
      toast.error("Vui lòng điền đầy đủ thông tin địa chỉ.");
      return;
    }
    if (!formData.province) {
      toast.error("Vui lòng chọn tỉnh/thành phố.");
      return;
    }
    if (!formData.district) {
      toast.error("Vui lòng chọn quận/huyện.");
      return;
    }
    if (!formData.ward) {
      toast.error("Vui lòng chọn phường/xã.");
      return;
    }
    if (!formData.specificAddress) {
      toast.error("Vui lòng điền địa chỉ cụ thể.");
      return;
    }
    try {
      const newAddress = {
        shippingName: formData.name,
        shippingPhone: formData.phone,
        shippingAddress: `${formData.specificAddress}, ${formData.ward}, ${formData.district}, ${formData.province}`,
        isDefault: false,
      };

      if (editAddressId) {
        await axios.put(
          `http://localhost:8080/api/shipping-addresses/update/${editAddressId}`,
          newAddress
        );
      } else {
        await axios.post(
          `http://localhost:8080/api/shipping-addresses/add/${userId}`,
          newAddress
        );
      }

      const response = await axios.get(
        `http://localhost:8080/api/shipping-addresses/${userId}`
      );
      console.log("Danh sách địa chỉ mới:", newAddress);
      toast.success("Địa chỉ đã được lưu thành công.");
      setShippingAddress(response.data);
      setShowEditForm(false);
    } catch (error) {
      console.error("Lỗi khi lưu địa chỉ mới:", error);
    }
  };

  const handleDeleteClick = (addressId, userId) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa địa chỉ này?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        // Thực hiện hành động xóa khi người dùng xác nhận
        deleteAddress(addressId, userId);
      }
    });
  };

  const deleteAddress = async (addressId, userId) => {
    try {
      // Xóa địa chỉ bằng addressId
      await axios.delete(
        `http://localhost:8080/api/shipping-addresses/delete/${addressId}`
      );

      // Lấy danh sách địa chỉ mới
      const response = await axios.get(
        `http://localhost:8080/api/shipping-addresses/${userId}`
      );

      // Cập nhật state với danh sách địa chỉ mới
      setShippingAddress(response.data);
      toast.success("Địa chỉ đã được xóa thành công.");
    } catch (error) {
      console.error("Lỗi khi xóa địa chỉ:", error);
      toast.error("Lỗi khi xóa địa chỉ.");
    }
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Thanh Toán</h2>

        {validationMessage && (
          <Alert variant="danger">{validationMessage}</Alert>
        )}

        <Row className="g-4">
          <Col md={12}>
            <Card className="shadow-sm bg-white">
              <Card.Header className="bg-dark text-white">
                <h5>Thông Tin Giao Hàng</h5>
              </Card.Header>
              <Card.Body className="Card-infor">
                {!showEditForm ? (
                  <>
                    {shippingAddress.length > 0 ? (
                      <Form.Group>
                        <h5>Thông tin giao hàng đã lưu:</h5>
                        <div className="shipping-address-container">
                          {shippingAddress.map((address) => (
                            <div
                              className="shipping-address-item"
                              key={address.id}
                            >
                              <Form.Check
                                type="radio"
                                label={
                                  <>
                                    <strong>{address.shippingName}</strong>{" "}
                                    <br />
                                    {address.shippingAddress} <br />
                                    <span>SĐT: {address.shippingPhone}</span>
                                  </>
                                }
                                name="shippingAddress"
                                value={address.id}
                                onChange={handleInputChange}
                                checked={
                                  formData.shippingAddress ===
                                  address.id.toString()
                                }
                              />
                              <div className="d-flex">
                                <FaEdit
                                  style={{
                                    cursor: "pointer",
                                    marginRight: "10px",
                                  }}
                                  onClick={() => handleEditClick(address)}
                                />
                                <FaTrash
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    handleDeleteClick(address.id, userId)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </Form.Group>
                    ) : (
                      <p>Đang tải địa chỉ giao hàng...</p>
                    )}

                    <hr />
                    <Button className="text-end mt-4" onClick={handleAddClick}>
                      Thêm thông tin nhận hàng
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>Thay đổi thông tin giao hàng</h5>
                      <Button
                        variant="light"
                        className="btn-close"
                        onClick={handleCloseEditForm}
                      ></Button>
                    </div>
                    <Form.Group className="mb-3">
                      <Form.Label>Họ và Tên</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nhập họ và tên"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Nhập số điện thoại"
                        required
                      />
                    </Form.Group>
                    <Form.Label>Địa chỉ</Form.Label>
                    <hr />
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Tỉnh/Thành phố</Form.Label>
                          <Select
                            options={[
                              ...new Set(
                                addressData.map((item) => item.province)
                              ),
                            ].map((province) => ({
                              label: province,
                              value: province,
                            }))}
                            value={{
                              label: formData.province,
                              value: formData.province,
                            }}
                            onChange={handleProvinceChange}
                            placeholder="Chọn hoặc nhập Tỉnh/Thành phố"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Quận/Huyện</Form.Label>
                          <Select
                            options={districts}
                            value={{
                              label: formData.district,
                              value: formData.district,
                            }}
                            onChange={handleDistrictChange}
                            placeholder="Chọn hoặc nhập Quận/Huyện"
                            isDisabled={!formData.province}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phường/Xã</Form.Label>
                          <Select
                            options={wards}
                            value={{
                              label: formData.ward,
                              value: formData.ward,
                            }}
                            onChange={handleWardChange}
                            placeholder="Chọn hoặc nhập Phường/Xã"
                            isDisabled={!formData.district}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Địa chỉ cụ thể</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            name="specificAddress"
                            value={formData.specificAddress}
                            onChange={handleInputChange}
                            placeholder="Nhập địa chỉ cụ thể"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="primary" onClick={handleSaveAddress}>
                      Lưu địa chỉ
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col md={12}>
            <Card className="shadow-sm bg-white">
              <Card.Header className="bg-dark text-white">
                <h5>Thông Tin Sản Phẩm</h5>
              </Card.Header>
              <Card.Body>
                {itemsToCheckout.map((item) => (
                  <div key={item.id} className="mb-3 d-flex align-items-start">
                    <div className="me-3">
                      <img
                        src={`http://localhost:8080${item.productVersion.imageUrl}`}
                        alt={item.productVersion.name}
                        className="img-fluid"
                        style={{ maxWidth: "250px" }}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <Form className="mb-3 mt-4">
                        <Form.Group className="mb-2 d-flex align-items-center">
                          <Form.Label
                            className="fw-bold me-3"
                            style={{ minWidth: "120px" }}
                          >
                            Tên sản phẩm :
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={item.productVersion.name}
                            readOnly
                            plaintext
                          />
                        </Form.Group>

                        <Form.Group className="mb-2 d-flex align-items-center">
                          <Form.Label
                            className="fw-bold me-3"
                            style={{ minWidth: "120px" }}
                          >
                            Giá :
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={`${item.productVersion.price.toLocaleString(
                              "vi-VN"
                            )}₫`}
                            readOnly
                            plaintext
                          />
                        </Form.Group>

                        <Form.Group className="mb-2 d-flex align-items-center">
                          <Form.Label
                            className="fw-bold me-3"
                            style={{ minWidth: "120px" }}
                          >
                            Số lượng :
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={item.quantity}
                            readOnly
                            plaintext
                          />
                        </Form.Group>

                        <Form.Group className="d-flex align-items-center">
                          <Form.Label
                            className="fw-bold me-3"
                            style={{ minWidth: "120px" }}
                          >
                            Tổng tiền :
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={`${(
                              item.productVersion.price * item.quantity
                            ).toLocaleString("vi-VN")}₫`}
                            readOnly
                            plaintext
                          />
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                ))}
                <Card className="shadow-sm bg-white">
                  <Card.Header className="bg-dark text-white">
                    <h5>Phương Thức Giao Hàng</h5>
                  </Card.Header>
                  <Card.Body>
                    {shippingMethods.length > 0 ? (
                      <Form.Group>
                        {shippingMethods.map((method) => (
                          <Form.Check
                            type="radio"
                            label={`${method.name} (${
                              method.description
                            }) - ${method.shippingFee.toLocaleString(
                              "vi-VN"
                            )}₫`}
                            name="shippingMethodId"
                            value={method.id}
                            onChange={handleInputChange}
                            checked={
                              formData.shippingMethodId === method.id.toString()
                            }
                            key={method.id}
                          />
                        ))}
                      </Form.Group>
                    ) : (
                      <p>Đang tải phương thức giao hàng...</p>
                    )}
                  </Card.Body>
                </Card>
                <Col md="3">
                  <Button
                    variant="outline-primary"
                    className="rounded-pill px-4 py-2 fw-bold mb-4 mt-4"
                    onClick={() => setShowCouponModal(true)}
                  >
                    <i className="bi bi-tag"></i> Chọn mã giảm giá
                  </Button>
                  <Modal
                    show={showCouponModal}
                    onHide={() => setShowCouponModal(false)}
                    centered
                    size="lg"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title className="fw-bold">
                        🎁 Chọn mã giảm giá
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {availableCoupons.length > 0 ? (
                        <div className="coupon-list">
                          {availableCoupons.map((coupon) => (
                            <Card
                              key={coupon.id}
                              className={`mb-4 shadow-sm border-0 ${
                                formData.voucher === coupon.id.toString()
                                  ? "border-success"
                                  : ""
                              }`}
                              style={{
                                backgroundColor: "#f8f9fa",
                                borderRadius: "15px",
                              }}
                            >
                              <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <Card.Title className="text-primary fw-bold">
                                      {coupon.code}
                                    </Card.Title>
                                    <Card.Text className="text-secondary">
                                      {coupon.description}
                                    </Card.Text>
                                  </div>
                                  <Button
                                    variant="success"
                                    className="rounded-pill btn-sm px-3 py-2 clickbutton"
                                    onClick={() => handleSelectCoupon(coupon)}
                                  >
                                    <i className="bi bi-check-circle"></i> Chọn
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <Alert
                          variant="warning"
                          className="text-center fw-bold"
                        >
                          Không có mã giảm giá khả dụng.
                        </Alert>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        className="rounded-pill px-4"
                        onClick={() => setShowCouponModal(false)}
                      >
                        Đóng
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Col>

                <Form.Group className="mb-4">
                  <Form.Label>Phương Thức Thanh Toán</Form.Label>
                  <div className="d-flex flex-column">
                    {paymentMethods.length > 0 ? (
                      paymentMethods.map((method) => (
                        <Form.Check
                          type="radio"
                          label={method.name}
                          name="paymentMethod"
                          value={method.id}
                          checked={
                            formData.paymentMethod === method.id.toString()
                          }
                          onChange={handleInputChange}
                          key={method.id}
                        />
                      ))
                    ) : (
                      <p>Đang tải phương thức thanh toán...</p>
                    )}
                  </div>
                </Form.Group>
                <hr />

                <div className="mt-3">
                  <h5 className="fw-bold">
                    Tổng cộng: {totalAmount.toLocaleString("vi-VN")}₫
                  </h5>
                </div>
                <hr />
                <Button variant="dark" type="submit" className="w-100">
                  Đặt hàng
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Checkout;
