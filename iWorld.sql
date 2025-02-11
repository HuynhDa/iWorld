CREATE DATABASE iWorld7;
USE iWorld7;


-- Bảng users (người dùng)
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    phone_number NVARCHAR(20),
    role INT DEFAULT 1, -- 0: Admin, 1: User
    created_at DATETIME DEFAULT GETDATE()
);


CREATE TABLE shipping_addresses (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL, -- Liên kết với người dùng
    shipping_name NVARCHAR(MAX) NOT NULL, -- Tên người nhận
    shipping_phone NVARCHAR(MAX) NOT NULL, -- Số điện thoại người nhận
    shipping_address NVARCHAR(MAX) NOT NULL, -- Địa chỉ chi tiết
    is_default BIT DEFAULT 0, -- Địa chỉ mặc định (0: không, 1: có)
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id) -- Khóa ngoại với bảng users
);



-- Bảng categories (danh mục sản phẩm)
CREATE TABLE categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX)
);

-- Bảng products (sản phẩm)
CREATE TABLE products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    description NVARCHAR(MAX),
    brand_name NVARCHAR(255) DEFAULT 'Apple', -- Vì chỉ bán sản phẩm Apple
    status INT DEFAULT 1, -- 0: Hết hàng, 1: Còn hàng
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Bảng product_images (hình ảnh sản phẩm)
CREATE TABLE product_images (
    id INT IDENTITY(1,1) PRIMARY KEY,
    product_id INT NOT NULL,
    image_url NVARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Bảng `product_versions` đã được sửa lại
CREATE TABLE product_versions (
    id INT IDENTITY(1,1) PRIMARY KEY,
    product_id INT NOT NULL,
    storage_capacity NVARCHAR(50),   -- Dung lượng lưu trữ (ví dụ: 128GB, 256GB, 512GB)
    ram_size NVARCHAR(50),           -- Dung lượng RAM (ví dụ: 8GB, 16GB, 32GB)
    chip NVARCHAR(50),               -- Chip (ví dụ: A16 Bionic, M1 Pro)
    color NVARCHAR(50),              -- Màu sắc (ví dụ: Đen, Trắng)
    total_quantity INT DEFAULT 0,    -- Số lượng tổng sản phẩm
    quantity INT DEFAULT 0,          -- Số lượng tồn kho
    sold_quantity INT DEFAULT 0,     -- Số lượng sản phẩm đã bán
    price NVARCHAR(MAX) NOT NULL,   -- Giá của phiên bản này
    FOREIGN KEY (product_id) REFERENCES products(id)
);



-- Bảng reviews (đánh giá sản phẩm)
CREATE TABLE reviews (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Bảng cart (giỏ hàng)
CREATE TABLE cart (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Bảng cart_items (chi tiết giỏ hàng)
CREATE TABLE cart_items (
    id INT IDENTITY(1,1) PRIMARY KEY,
    cart_id INT NOT NULL,
    product_version_id INT NOT NULL, -- Liên kết với phiên bản sản phẩm
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES cart(id),
    FOREIGN KEY (product_version_id) REFERENCES product_versions(id)
);

-- Bảng coupons (mã giảm giá)
CREATE TABLE coupons (
    id INT IDENTITY(1,1) PRIMARY KEY,
    code NVARCHAR(50) UNIQUE NOT NULL,
    discount_percentage NVARCHAR(50),
	discount_type NVARCHAR(50) NOT NULL,
	expiry_date DATETIME NOT NULL
);

-- Bảng payment_methods (phương thức thanh toán)
CREATE TABLE payment_methods (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX)
);

-- Bảng shipping_methods (phương thức vận chuyển)
CREATE TABLE shipping_methods (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    shipping_fee DECIMAL(10, 2) NOT NULL
);

-- Bảng orders (đơn hàng)
CREATE TABLE orders (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL, -- Liên kết với người dùng
    shipping_address_id INT NOT NULL, -- Liên kết với bảng shipping_addresses
    order_date DATETIME DEFAULT GETDATE(),
    status INT DEFAULT 0, -- 0: Đang xử lý, 1: Đã giao, 2: Đã hủy
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method_id INT NOT NULL, -- Liên kết với bảng payment_methods
    shipping_method_id INT NOT NULL, -- Liên kết với bảng shipping_methods
    coupon_id INT, -- Liên kết với bảng coupons (có thể NULL nếu không dùng mã giảm giá)
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (shipping_address_id) REFERENCES shipping_addresses(id),
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id),
    FOREIGN KEY (shipping_method_id) REFERENCES shipping_methods(id),
    FOREIGN KEY (coupon_id) REFERENCES coupons(id)
);


-- Bảng order_items (chi tiết đơn hàng)
CREATE TABLE order_items (
    id INT IDENTITY(1,1) PRIMARY KEY,
    order_id INT NOT NULL,
    product_version_id INT NOT NULL, -- Liên kết với phiên bản sản phẩm
    quantity INT NOT NULL,           -- Số lượng sản phẩm mua
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_version_id) REFERENCES product_versions(id)
);



-- 1. Dữ liệu cho bảng `users` (Người dùng)
INSERT INTO users (name, email, password, phone_number, role)
VALUES
(N'Nguyen Van A', 'nguyenvana@example.com', '123456789', '0901234567', 1),
(N'Le Thi B', 'lethib@example.com', '123456789', '0907654321', 0);

-- Thêm thông tin giao hàng cho Nguyễn Văn A (id = 1)
INSERT INTO shipping_addresses (user_id, shipping_name, shipping_phone, shipping_address, is_default)
VALUES
(1, N'Nguyen Van A', '0901234567', N'123 Đường Lê Lợi, Quận 1, TP.HCM', 1), -- Địa chỉ mặc định
(1, N'Nguyen Van A', '0901234567', N'456 Đường Nguyễn Trãi, Quận 5, TP.HCM', 0);

-- 2. Dữ liệu cho bảng `categories` (Danh mục sản phẩm)
INSERT INTO categories (name, description)
VALUES
(N'iPhone', N'Các sản phẩm điện thoại thông minh của Apple'),
(N'MacBook', N'Các sản phẩm laptop của Apple'),
(N'AirPods', N'Các sản phẩm tai nghe của Apple'),
(N'iPad', N'Các sản phẩm máy tính bảng của Apple'),
(N'Apple Watch', N'Các sản phẩm đồng hồ thông minh của Apple'),
(N'Phụ kiện', N'Các phụ kiện của Apple (bao gồm sạc, ốp lưng, cáp, v.v.)');

-- 3. Dữ liệu cho bảng `products` (Sản phẩm)
INSERT INTO products (name, category_id, description, brand_name, status)
VALUES
-- Điện thoại
('iPhone 15', 1, N'Thiết kế Titanium, chip A16 Bionic, camera 48MP, hỗ trợ USB-C.', 'Apple', 1),
-- Laptop
('MacBook Pro 16 inch', 2, N'MacBook Pro với màn hình Retina 16 inch, chip M1 Pro mạnh mẽ.', 'Apple', 1),
-- Tai nghe
('AirPods 3', 3, N'Tai nghe không dây với thiết kế nhỏ gọn và âm thanh ấn tượng.', 'Apple', 1),
-- Máy tính bảng
('iPad Air', 4, N'Máy tính bảng iPad Air mỏng nhẹ, hỗ trợ Apple Pencil.', 'Apple', 1),
-- Đồng hồ
('Apple Watch SE', 5, N'Đồng hồ thông minh với các tính năng theo dõi sức khỏe cơ bản.', 'Apple', 1),
-- Phụ kiện
('Apple Pencil', 6, N'Bút cảm ứng dành cho iPad, hỗ trợ thao tác chính xác.', 'Apple', 1);

-- 4. Dữ liệu cho bảng `product_images` (Hình ảnh sản phẩm)
-- Đảm bảo URLs hợp lệ và chính xác hơn.
INSERT INTO product_images (product_id, image_url)
VALUES
-- iPhone 15
(1, '/images/Iphone14/iphone14black.png'),
(1, '/images/Iphone14/iphone14black.png'),
(1, '/images/Iphone14/iphone14black.png'),
-- MacBook Pro 16 inch
(2, '/images/Iphone14/iphone14black.png'),
(2, '/images/Iphone14/iphone14black.png'),
-- AirPods 3
(3, '/images/Iphone14/iphone14black.png'),
(3, '/images/Iphone14/iphone14black.png'),
-- iPad Air
(4, '/images/Iphone14/iphone14black.png'),
(4, '/images/Iphone14/iphone14black.png'),
-- Apple Watch SE
(5, '/images/Iphone14/iphone14black.png'),
(5, '/images/Iphone14/iphone14black.png'),
-- Apple Pencil
(6, '/images/Iphone14/iphone14black.png');

-- 5. Dữ liệu cho bảng `product_versions` (Phiên bản sản phẩm)
-- Đảm bảo đồng nhất giữa các phiên bản.
INSERT INTO product_versions (product_id, storage_capacity, ram_size, chip, color, total_quantity, quantity, sold_quantity, price)
VALUES
-- iPhone 15
(1, '128GB', NULL, 'A16 Bionic', N'Đen', 20, 20, 0, 22990000),
(1, '256GB', NULL, 'A16 Bionic', N'Trắng', 15, 15, 0, 24990000),
(1, '512GB', NULL, 'A16 Bionic', N'Xanh', 10, 10, 0, 27990000),
-- MacBook Pro 16 inch
(2, '512GB', '16GB', 'M1 Pro', N'Bạc', 25, 25, 0, 65990000),
(2, '1TB', '16GB', 'M1 Pro', N'Xám', 15, 15, 0, 69990000),
(2, '1TB', '32GB', 'M1 Pro', N'Bạc', 12, 12, 0, 74990000),
(2, '2TB', '32GB', 'M1 Pro', N'Đen', 10, 10, 0, 79990000),
-- AirPods 3
(3, NULL, NULL, NULL, N'Trắng', 15, 15, 0, 3990000),
-- iPad Air
(4, '64GB', NULL, NULL, N'Xám', 15, 15, 0, 15990000),
(4, '256GB', NULL, NULL, N'Bạc', 12, 12, 0, 17990000),
-- Apple Watch SE
(5, NULL, NULL, NULL, N'Trắng', 15, 15, 0, 4990000),
-- Apple Pencil
(6, NULL, NULL, NULL, N'Trắng', 25, 25, 0, 2990000);

INSERT INTO orders (user_id, total_amount, 	shipping_address_id, payment_method_id, shipping_method_id, coupon_id, status)
VALUES
(1, 68980000, 1, 1, 1, NULL, 0); -- Đơn hàng đang xử lý


INSERT INTO order_items (order_id, product_version_id, quantity, price)
VALUES (1, 5, 1, 45990000); -- MacBook Pro 16 inch 512GB Bạc




-- 8. Dữ liệu cho bảng `reviews` (Đánh giá sản phẩm)
INSERT INTO reviews (user_id, product_id, rating, review_text)
VALUES
(1, 1, 5, N'Sản phẩm tuyệt vời, rất nhanh và đẹp!'),
(1, 2, 4, N'MacBook rất tốt, nhưng hơi nặng.');

-- 9. Dữ liệu cho bảng `cart` (Giỏ hàng)
INSERT INTO cart (user_id)
VALUES
(1);

-- 10. Dữ liệu cho bảng `cart_items` (Chi tiết giỏ hàng)
INSERT INTO cart_items (cart_id, product_version_id, quantity)
VALUES
(1, 2, 1);  -- MacBook Pro 16 inch 1TB Đen

-- 11. Dữ liệu cho bảng `coupons` (Mã giảm giá)
INSERT INTO coupons (code, discount_percentage, discount_type, expiry_date)
VALUES 
('DISCOUNT20', '20%', 'PERCENTAGE', '2025-12-31 23:59:59'),
('FREESHIP2025', 'FREE SHIPPING', 'FREE_SHIPPING', '2025-11-30 23:59:59');

-- 12. Dữ liệu cho bảng `payment_methods` (Phương thức thanh toán)
INSERT INTO payment_methods (name, description)
VALUES
('Credit Card', N'Thanh toán bằng thẻ tín dụng'),
('Cod', N'Thanh toán khi nhận hàng');

-- 13. Dữ liệu cho bảng `shipping_methods` (Phương thức vận chuyển)
INSERT INTO shipping_methods (name, description, shipping_fee)
VALUES
(N'Giao hàng nhanh', N'Giao hàng trong vòng 3-5 ngày', 50000),
(N'Giao hàng tiêu chuẩn', N'Giao hàng trong vòng 7-10 ngày', 30000);
