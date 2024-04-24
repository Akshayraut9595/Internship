import React, { useState } from "react";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  console.log(formData);
  console.log(files);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // const handleImageSubmit = (e) => {
  //   if(files.length > 0 && files.length < 7 ){
  //     const promises = [];
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      setError(false);
      const res = await fetch("http://localhost:8000/api/v1/products/add",{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          ...formData,
          ...files
        })
      })

      const data = await res.json();
      setLoading(false);
      if(data.success === false){
        setError(data.message);
      }
    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <div className="flex items-center flex-col gap-3 mb-4">
      <h1 className="text-red-500 mt-5">DashBoard</h1>
      <form className="flex items-center flex-col justify-center gap-3">
        <div className="gap-3">
          <label gap-2>Name:</label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Product name"
            id="productName"
            name="name"
            required
            className="border p-3 rounded-lg"
          />
        </div>
        <div className="gap-3">
          <label>Description:</label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Product Description"
            id="Description"
            name="description"
            required
            className="border p-3 rounded-lg"
          />
        </div>
        <div className="gap-3">
          <label>Price:</label>
          <input
            onChange={handleChange}
            type="number"
            placeholder="Product Price"
            id="price"
            name="price"
            required
            className="border p-3 rounded-lg"
          />
        </div>
        <div className="gap-3">
          <label>Weight:</label>
          <input
            onChange={handleChange}
            type="number"
            placeholder="Product Weight"
            id="weight"
            name="weight"
            required
            className="border p-3 rounded-lg"
          />
        </div>
        <div className="flex gap-4">
          <input
            onChange={(e) => setFiles(e.target.files)}
            className="p-3 border border-gray-300 rounded w-full"
            type="file"
            id="productImage"
            accept="images/*"
            required
            multiple
          />
          <button
            // onClick={handleImageSubmit}
            type="button"
            className="p-2 bg-green-400 text-green-900 border border-green-900 rounded uppercase hover:shadow-lg disabled:opacity-80"
          >
            Upload
          </button>
        </div>
        {/* <Link className="bg-green-500 border p-3 rounded-lg" to={"/product"}>Add Product</Link> */}
        <button onClick={handleSubmit} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          {loading ? "Adding...":"Add"}
        </button>
        {error && <p className="text-red-700">{error}</p> }
      </form>
    </div>
  );
};

export default DashBoard;
