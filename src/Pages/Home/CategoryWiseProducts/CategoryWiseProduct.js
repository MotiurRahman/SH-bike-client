import React, { useEffect, useState } from "react";
import blueTick from "../../../Assets/images/blueTick.png";

const CategoryWiseProduct = ({ product, setProduct, role }) => {
  const [verified, setVefified] = useState(false);
  const {
    productName,
    originalPrice,
    resalePrice,
    usedYear,
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

  useEffect(() => {
    fetch(`https://server-sh-bike-motiurrahman.vercel.app/user?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setVefified(data.verified);
      });
  }, [email]);

  return (
    <div className="card lg:w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="h-40 w-full" src={image} alt="bike" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {productName}!<div className="badge badge-secondary">{category}</div>
        </h2>
        <p>
          <b>Used:</b> {usedYear}
        </p>
        <p>
          <b>Location: </b>
          {location}
        </p>
        {/* <p>
          <b>Phone:</b> {phone}
        </p> */}
        <p>
          <b>Desc:</b> {description}
        </p>
        <p>
          <b>Posted on:</b> {updatedDate}
        </p>
        <div className="card-actions justify-between">
          <div className="badge badge-accent">
            Original Price: {originalPrice}
          </div>
          <div className="badge badge-secondary">
            Resale Price: {resalePrice}
          </div>
        </div>
        <div className="card-actions justify-between items-center align-middle">
          <div className="flex">
            <h1 className="mr-2">
              <b>Seller:</b> {sellerName}
            </h1>
            {verified && (
              <img className="h-6" src={blueTick} alt="verified"></img>
            )}
          </div>
          <div>
            {/* <button className="btn btn-accent">Book Now</button> */}
            <label
              htmlFor="booking-modal"
              disabled={role !== "buyer"}
              onClick={() => setProduct(product)}
              className="btn btn-accent"
            >
              Book Now
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProduct;
