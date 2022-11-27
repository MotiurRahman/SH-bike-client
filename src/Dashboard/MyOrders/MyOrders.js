import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import { AuthUserContext } from "../../AuthContext/AuthContext";
import Loading from "../../Component/Loading/Loading";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const MyOrders = () => {
  //const myproducts = useLoaderData();

  const { user } = useContext(AuthUserContext);

  const {
    data: myOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myorders"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/myorders?email=${user?.email}`,
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

  const handleRemove = (order) => {
    if (window.confirm("Would you like to to remove this order!")) {
      // console.log(order._id);
      //console.log(data._id);
      const URL = `http://localhost:8000/myorders?id=${order._id}`;
      fetch(URL, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast("Order removed Successfully");
            refetch();
          }
        });
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-left">My Products</h1>
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
            {myOrders?.map((order, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>
                  <div className="avatar">
                    <div className="w-24 rounded-xl">
                      <img src={order.image} alt="productIMG" />
                    </div>
                  </div>
                </th>
                <td>{order.productName}</td>
                <td>{order.resalePrice}</td>
                <td>
                  <button className="btn btn-small btn-primary">Pay</button>
                </td>

                <td>
                  <button
                    onClick={() => handleRemove(order)}
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

export default MyOrders;
