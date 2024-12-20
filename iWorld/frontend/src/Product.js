import React from 'react';

function Product({ id, title, description, price, images }) {
    return (
        <div className="col">
            <div className="card">
                {images && images.length > 0 ? (
                    <img src={images[0].imageUrl || "https://via.placeholder.com/150"} className="card-img-top" alt={title} />
                ) : (
                    <img src="https://via.placeholder.com/150" className="card-img-top" alt={title} />
                )}
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><strong>Price:</strong> ${price}</p>
                    <a href={`/product/${id}`} className="btn btn-primary">View Details</a>
                </div>
            </div>
        </div>
    );
}

export default Product;
