import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ref,
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";


const DashBoard = () => {
  const [formData, setFormData] = useState({
    productName: '',
    Description: '',
    price: '',
    weight: '',
    productImage: [],
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  console.log(formData);
  console.log(files);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.productImage < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            productImage: formData.productImage.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   setLoading(true);
    //   setError(false);
    //   for (const key in formData) {
    //     if (formData[key] === '' || formData[key] === null) {
    //       setError('Please fill out all fields.');
    //       return;
    //     }
    //   }
    //   const res = await fetch("http://localhost:8000/api/v1/products/add", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   const data = await res.json();
    //   setLoading(false);
    //   if (data.success === false) {
    //     setError(data.message);
    //   }
    // } catch (error) {
    //   setError(error.message);
    //   setLoading(false);
    // }

    try {
      setLoading(true);
      setError(false);
      
      // Check if any field is empty
      for (const key in formData) {
        if (formData[key] === '' || formData[key] === null) {
          setError('Please fill out all fields.');
          return;
        }
      }
      
      const response = await axios.post("/api/v1/products/add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // To include credentials in the request
      });
    
      const data = response.data;
      setLoading(false);
    
      if (data.success === false) {
        setError(data.message);
        return;
      }
      
      // Handle success
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      productImage: formData.productImage.filter((_, i) => i !== index),
    });
  };
  return (
    <div className="flex items-center flex-col gap-3 mb-4">
      <h1 className="text-red-500 mt-5 text-3xl font-bold">Dashboard</h1>
      <form className="flex items-center flex-col justify-center gap-3">
        <div className="flex items-center justify-center gap-3">
          <label htmlFor="productName" className="gap-2">
            Name:
          </label>
          <input
            type="text"
            placeholder="Product name"
            id="productName"
            name="name"
            required
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <label htmlFor="Description">Description:</label>
          <input
            type="text"
            placeholder="Product Description"
            id="Description"
            name="description"
            required
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            placeholder="Product Price"
            id="price"
            name="price"
            required
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            placeholder="Product Weight"
            id="weight"
            name="weight"
            required
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="flex items-center gap-4">
            <label htmlFor="productImage">Select Image:</label>
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
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
              className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.productImage.length > 0 &&
            formData.productImage.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  Delete
                </button>
              </div>
            ))}
          {/* <Link class="bg-green-500 border p-3 rounded-lg" to={"/product"}>Add Product</Link> */}
          <button
            onClick={handleSubmit}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
        {error && <p className="text-red-700">{error}</p> }
      </form>
    </div>
  );
};

export default DashBoard;
