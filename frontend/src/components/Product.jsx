import React, { useState } from "react";
import "./styles/Product.css"; 

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "A brief description of Product 1 and its features.",
    price: 19.99,
    imgUrl:
      "https://images.unsplash.com/photo-1598618826732-fb2fdf367775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxzbWFydHBob25lfGVufDB8MHx8fDE3MjEzMDU4NTZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 2,
    name: "Product 2",
    description: "A brief description of Product 2 and its features.",
    price: 24.99,
    imgUrl:
      "https://images.unsplash.com/photo-1720048171731-15b3d9d5473f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MXwxfHNlYXJjaHwxfHxzbWFydHBob25lfGVufDB8MHx8fDE3MjEzMDU4NTZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 3,
    name: "Product 3",
    description: "A brief description of Product 3 and its features.",
    price: 29.99,
    imgUrl:
      "https://images.unsplash.com/photo-1600087626120-062700394a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxzbWFydHBob25lfGVufDB8MHx8fDE3MjEzMDU4NTZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 4,
    name: "Product 4",
    description: "A brief description of Product 4 and its features.",
    price: 34.99,
    imgUrl:
      "https://images.unsplash.com/photo-1598965402089-897ce52e8355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxzbWFydHBob25lfGVufDB8MHx8fDE3MjEzMDU4NTZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const Product = () => {
  const [filter, setFilter] = useState({
    name: "",
    minPrice: 0,
    maxPrice: 100,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      product.price >= filter.minPrice &&
      product.price <= filter.maxPrice
    );
  });

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Sản phẩm</h2>

      {/* Filter Form */}
      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <label htmlFor="name" className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Tìm theo tên sản phẩm"
            value={filter.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="minPrice" className="form-label">Giá tối thiểu</label>
          <input
            type="number"
            name="minPrice"
            id="minPrice"
            className="form-control"
            placeholder="Min Giá"
            value={filter.minPrice}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="maxPrice" className="form-label">Giá tối đa</label>
          <input
            type="number"
            name="maxPrice"
            id="maxPrice"
            className="form-control"
            placeholder="Max Giá"
            value={filter.maxPrice}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-3 mb-2 d-flex align-items-end">
          <button className="btn btn-primary w-100">Lọc</button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.imgUrl}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5 mb-0">${product.price.toFixed(2)}</span>
                  <button className="btn btn-outline-primary">
                    <i className="bi bi-cart-plus"></i> Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
