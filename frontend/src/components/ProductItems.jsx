import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductItems = () => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const params = useParams(); 

    console.log("product id : ",params.productId);
  
    useEffect(() => {
        const fetchListing = async () => {
          try {
            setLoading(true);
            const res = await axios.post(`http://localhost:8000/api/v1/products/getproduct/${params.productId}`);
            console.log("res : ",res);
            const data = await res.data.data;

            if (data.success === false) {
              setError(true);
              setLoading(false);
              return;
            }
            setListing(data);
            setLoading(false);
            setError(false);
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
        fetchListing();
      }, [params.productId]);
    
  return <div>
    {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}

      {listing && (
      <div>
        <div>{listing.productName}</div>
        <div>
          {/* Ensure listing.productImages exists before accessing its first element */}
          {listing.productImages && listing.productImages[0] && (
            <img src={listing.productImages[0]} alt="" />
          )}
        </div>
        <div>
            Description: 
            {listing.Description}
        </div>
        <div>
            Price: 
            {listing.Price}
        </div>
        <div>
            Weight: 
            {listing.weight}
        </div>
      </div>
    )}
  </div>;
};

export default ProductItems;
