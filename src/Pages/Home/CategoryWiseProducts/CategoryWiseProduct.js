import { useQuery } from "@tanstack/react-query";
import React from "react";
import { format } from "date-fns";
import Loading from "../../../Component/Loading/Loading";

const CategoryWiseProduct = ({ product }) => {
  const {
    productName,
    originalPrice,
    resalePrice,
    usedYear,
    condition,
    category,
    phone,
    location,
    description,
    purchaseYear,
    image,
    email,
    sellerName,
    saleStatus,
    dateAdded,
  } = product;

  //Date formate
  const dateStr = dateAdded.replace(/T/, " ").replace(/\..+/, "");
  const date = new Date(dateStr);
  const updatedDate = date.toLocaleString();

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`http://localhost:8000/user?email=${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  if (isLoading) return <Loading></Loading>;

  if (error) return <Loading></Loading>;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {productName}!<div className="badge badge-secondary">{category}</div>
        </h2>
        <p>Used: {usedYear}</p>
        <p>Location: {location}</p>
        <p>Phone: {phone}</p>
        <p>Desc: {description}</p>
        <p>Posted on: {updatedDate}</p>
        <div className="card-actions justify-between">
          <div className="badge badge-accent">
            Original Price: {originalPrice}
          </div>
          <div className="badge badge-secondary">
            Resale Price: {resalePrice}
          </div>
        </div>
        <div className="card-actions justify-between items-center">
          <div className="flex">
            <h1>Seller: {sellerName}</h1>
            {data?.verified === true && <p>verified</p>}
          </div>
          <div>
            <button className="btn btn-accent">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProduct;
