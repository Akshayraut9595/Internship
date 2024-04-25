import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div key={product.id}>
      <Link to={`productItem/${product._id}`}>
      <img src={product.productImages[0]} alt="image" className="h-40 w-40"/>
      <p>{product.productName}</p>
      <p>{product.Description}</p>
      <p>Price: {product.price}</p>
      <p>Weight: {product.weight}</p>
      </Link>
      {/* Add any other product information you want to display */}
    </div>
  );
};

export default Product;
