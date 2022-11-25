import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";

const AddProduct = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imgHostKey = process.env.REACT_APP_imgbb_KEY;

  const handleAddProduct = (data) => {
    //console.log(data);
    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const product = {
            productName: data.productName,
            price: data.price,
            condition: data.condition,
            category: data.category,
            phone: data.phone,
            location: data.location,
            description: data.description,
            purchaseYear: data.purchaseYear,
            image: result.data.url,
          };
          console.log("product:", product);

          fetch("http://localhost:8000/addProduct", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                setLoading(false);
                toast("Product uploaded successfully");
                navigate("/dashboard/myproducts");
              }
            })
            .catch((error) => {
              setLoading(false);
              setMessage(error.message);
            });
        }
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.message);
      });
  };

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("http://localhost:8000/categories").then((res) => res.json()),
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Add A New Product</h1>
      <form
        className="flex justify-items-center items-center flex-col"
        onSubmit={handleSubmit(handleAddProduct)}
      >
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <div className="form-control w-full max-w-xs my-2">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              {...register("productName", {
                required: "Product Name is required",
              })}
              type="text"
              name="productName"
              placeholder="Enter product name"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.productName && (
              <span className="text-red-600 text-left">
                {errors.productName.message}
              </span>
            )}
          </div>
          <div className="form-control w-full max-w-xs my-2">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              {...register("price", {
                required: "Product price is required",
              })}
              type="text"
              name="price"
              placeholder="Enter product name"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.price && (
              <span className="text-red-600 text-left">
                {errors.price.message}
              </span>
            )}
          </div>
          <div className="form-control w-full max-w-xs my-2">
            <label className="label">
              <span className="label-text">Condition</span>
            </label>
            <select
              {...register("condition", {
                required: "Select condition",
              })}
              name="condition"
              className="select select-bordered w-full max-w-xs"
            >
              <option value="">Select Condition</option>
              <option value="excellent">excellent</option>
              <option value="good">good</option>
              <option value="fair">fair</option>
            </select>

            {errors.condition && (
              <span className="text-red-600 text-left">
                {errors.condition.message}
              </span>
            )}
            <p className="text-green text-center">{message}</p>
          </div>

          <div className="form-control w-full max-w-xs my-2">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              {...register("category", {
                required: "Select category",
              })}
              name="category"
              className="select select-bordered w-full max-w-xs"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>

            {errors.category && (
              <span className="text-red-600 text-left">
                {errors.category.message}
              </span>
            )}
            <p className="text-green text-center">{message}</p>
          </div>

          <div className="form-control w-full max-w-xs my-2">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              {...register("phone", {
                required: "Phone number is required",
              })}
              type="number"
              name="phone"
              placeholder="Enter phone number"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.phone && (
              <span className="text-red-600 text-left">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="form-control w-full max-w-xs my-2">
            <label className="label">
              <span className="label-text">Location Address</span>
            </label>
            <input
              {...register("location", {
                required: "Location is required",
              })}
              type="text"
              name="location"
              placeholder="Enter location address"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.location && (
              <span className="text-red-600 text-left">
                {errors.location.message}
              </span>
            )}
          </div>

          <div className="form-control w-full max-w-xs my-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              {...register("description", {
                required: "Description is required",
              })}
              type="text"
              name="description"
              placeholder="Enter product description"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.description && (
              <span className="text-red-600 text-left">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="form-control w-full max-w-xs my-2">
            <label className="label">
              <span className="label-text">Purchase Year</span>
            </label>
            <input
              {...register("purchaseYear", {
                required: "Purchase Year is required",
              })}
              type="date"
              name="purchaseYear"
              placeholder="Enter product description"
              className="input input-bordered w-full max-w-xs"
            />
            {errors.purchaseYear && (
              <span className="text-red-600 text-left">
                {errors.purchaseYear.message}
              </span>
            )}
          </div>

          <div className="form-control w-full max-w-xs my-2">
            <label className="label">
              <span className="label-text">Upload A Photo</span>
            </label>
            <input
              type="file"
              {...register("image", {
                required: "Photo is Required",
              })}
              className="file-input input-bordered  w-full max-w-xs"
            />
            {errors.image && (
              <span className="text-red-600 text-left">
                {errors.image.message}
              </span>
            )}
            <p className="text-green text-center">{message}</p>
          </div>
        </div>

        {/* <p>{data}</p> */}

        {loading ? (
          <button className="btn loading btn-wide">... uploading</button>
        ) : (
          <input
            type="submit"
            className="btn btn-wide my-2"
            value="ADD A Product"
          />
        )}
      </form>
    </div>
  );
};

export default AddProduct;
