import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

import { useLoaderData, useNavigation } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";

import CheckoutForm from "../CheckoutForm/CheckoutForm";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPT_PK);
const Payment = () => {
  const bookings = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state == "loading") {
    return <Loading></Loading>;
  }
  const { productName, resalePrice } = bookings;
  //console.log(bookings);

  return (
    <div className="flex items-center justify-center flex-col mt-9">
      <h1>Booking for {productName}</h1>
      <p className="text-xl">
        Please pay {resalePrice} for your product {productName}
      </p>
      <div className="w-96 bg-slate-500 mt-10 mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm bookings={bookings} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
