import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import './Home.css';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <div className="hero text-center mb-5">
                <h1>Welcome to Apple Store</h1>
                <p>Discover the latest Apple products</p>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Product 
                            key={product.id} 
                            id={product.id} 
                            title={product.name} 
                            description={product.description} 
                            price={product.versions && product.versions[0] ? product.versions[0].price : 'N/A'} // Handle price
                            images={product.images || []} // Handle missing images array
                        />
                    ))
                ) : (
                    <p className="text-center">Loading products...</p>
                )}
            </div>
        </div>
    );
}

export default Home;
