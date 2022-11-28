import React, { useContext, useEffect, useState } from "react";
import blueTick from "../../../Assets/images/blueTick.png";
import wish from "../../../Assets/images/wish.png";
import wishLove from "../../../Assets/images/newWish.png";
import { AuthUserContext } from "../../../AuthContext/AuthContext";
import toast from "react-hot-toast";

const CategoryWiseProduct = ({ product, setProduct, role }) => {
  const [verified, setVerified] = useState(false);
  const { user } = useContext(AuthUserContext);

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
        setVerified(data.verified);
      });
  }, [email]);

  const addToWishList = (product) => {
    product.email = user?.email;
    //console.log(product);

    const wishPorduct = {
      bookingID: product._id,
      email: user?.email,
      name: user?.displayName,
      image: product.image,
      productName: product.productName,
      resalePrice: product.resalePrice,
      sellerName: product.sellerName,
      saleStatus: product.saleStatus,
      description: product.description,
      phone: product.phone,
      category: product.category,
      dateAdded: product.dateAdded,
      location: product.location,
      usedYear: product.usedYear,
    };

    console.log(wishPorduct);

    fetch("https://server-sh-bike-motiurrahman.vercel.app/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(wishPorduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("added to wishlist");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div className="card lg:w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="h-40 w-full" src={image} alt="bike" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {productName}!<div className="badge badge-secondary">{category}</div>
          <button
            disabled={role !== "buyer"}
            onClick={() => addToWishList(product)}
            className="ml-auto"
          >
            <img
              className="h-8"
              src={role !== "buyer" ? wish : wishLove}
              alt="wishList"
            />
          </button>
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
