import { format } from "date-fns";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthUserContext } from "../../AuthContext/AuthContext";

const BookingModal = ({ product, setProduct }) => {
  const { _id, productName, resalePrice, image } = product;
  //const date = format(selectedDate, "PP");
  //console.log(product);
  const handleClose = () => {
    setProduct();
  };
  const { user } = useContext(AuthUserContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const productName = form.productName.value;
    const resalePrice = form.resalePrice.value;
    const meetingLocation = form.meetingLocation.value;

    // [3, 4, 5].map((value, i) => console.log(value))
    const booking = {
      bookingID: _id,
      name,
      email,
      phone,
      productName,
      resalePrice,
      meetingLocation,
      image,
    };

    // TODO: send data to the server
    // and once data is saved then close the modal
    // and display success toast
    fetch("https://server-sh-bike-motiurrahman.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setProduct(null);
          toast.success("Booking confirmed");
          // refetch();
        } else {
          setProduct(null);
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            onClick={handleClose}
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              name="name"
              type="text"
              defaultValue={user?.displayName}
              disabled
              placeholder="Your Name"
              className="input w-full input-bordered"
            />
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              disabled
              placeholder="Email Address"
              className="input w-full input-bordered"
            />

            <input
              name="productName"
              type="text"
              defaultValue={productName}
              disabled
              placeholder="Product Name"
              className="input w-full input-bordered"
            />

            <input
              name="resalePrice"
              type="text"
              defaultValue={resalePrice}
              disabled
              placeholder="Resale Price"
              className="input w-full input-bordered"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input w-full input-bordered"
              required
            />
            <input
              name="meetingLocation"
              type="text"
              placeholder="Meeting Location"
              className="input w-full input-bordered"
              required
            />
            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
