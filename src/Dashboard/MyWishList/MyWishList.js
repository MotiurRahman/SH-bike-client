import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthUserContext } from "../../AuthContext/AuthContext";
import Loading from "../../Component/Loading/Loading";

const MyWishList = () => {
  const { user } = useContext(AuthUserContext);
  const {
    data: myWishlist = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/wishlist?email=${user?.email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleRemove = (wishList) => {
    if (window.confirm("Would you like to to remove this product!")) {
      // console.log(order._id);
      //console.log(data._id);
      const URL = `http://localhost:8000/wishlist?id=${wishList._id}`;
      fetch(URL, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast("Order wishlisted product Successfully");
            refetch();
          }
        });
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-left">My WishList</h1>
      <div className="overflow-x-auto">
        <table className="table w-full my-5">
          <thead>
            <tr>
              <th>id</th>
              <th>Photo</th>
              <th>Title</th>
              <th>Price</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myWishlist?.map((wishList, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>
                  <div className="avatar">
                    <div className="w-24 rounded-xl">
                      <img src={wishList.image} alt="productIMG" />
                    </div>
                  </div>
                </th>
                <td>{wishList.productName}</td>
                <td>{wishList.resalePrice}</td>
                <td>
                  {/* <button className="btn btn-small btn-primary">Pay</button> */}
                  {wishList.resalePrice && !wishList.paid && (
                    <Link to={`/dashboard/payment2/${wishList.wishID}`}>
                      {" "}
                      <button className="btn btn-primary">Pay</button>
                    </Link>
                  )}
                  {wishList.resalePrice && wishList.paid && (
                    <samp className="text-success">Paid</samp>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => handleRemove(wishList)}
                    className="btn btn-small btn-primary"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishList;
