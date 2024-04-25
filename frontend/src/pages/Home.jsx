import React, { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";

const Home = () => {
  const [productList, setProductList] = useState([]);

  console.log(productList);

  useEffect(() => {
    const fetchProductListings = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/products/getallproducts"
        );
        setProductList(response.data.data);
        console.log("response data", response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductListings();
  }, []);
  return (
    <div className="h-screen">
      <div className="">
        <div>
          <h2 className="text-2xl font-semibold text-slate-600">
            All Products
          </h2>
        </div>
        <div className="flex flex-wrap gap-4">
          {productList.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
