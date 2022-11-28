import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({ bookings }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const {
    _id,
    bookingID,
    name,
    email,
    phone,
    productName,
    resalePrice,
    meetingLocation,
  } = bookings;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ resalePrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        setClientSecret(data.clientSecret);
      });
  }, [resalePrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if ((paymentIntent.status = "succeeded")) {
      console.log("card info", card);
      toast("Payment successfully Done");
      setSuccess("Congrats! your payment completed");
      setTransactionId(paymentIntent.id);
      // store payment info in the database
      const payment = {
        resalePrice,
        transactionId: paymentIntent.id,
        email,
        bookingId: _id,
      };
      fetch("http://localhost:8000/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          //  console.log(data);
          fetch(`http://localhost:8000/sold-out?id=${bookingID}`, {
            method: "PATCH",
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
        });
    }
    setProcessing(false);
    console.log("paymentIntent:", paymentIntent);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-5 mx-5">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                padding: "20px",
                margin: "20px",
                color: "#ffffff",
                "::placeholder": {
                  color: "#ffffff",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary btn-small mt-10 ml-[45%]"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <p className="text-white text-center my-5">{cardError}</p>

      {success && (
        <div className="flex items-center justify-center flex-col my-5">
          <p className="text-green-500">{success}</p>
          <p className="text-white text-center">
            Your transactionID:{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
