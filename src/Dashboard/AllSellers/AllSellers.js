import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const AllSellers = () => {
  //const myproducts = useLoaderData();
  const [selectedSeller, setSelectedSeller] = useState(null);

  const {
    data: allSeller = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allsellers"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:8000/allsellers", {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
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

  const verify = (user) => {
    if (window.confirm("Would you like to to verify this seller!")) {
      console.log(user._id);
      //console.log(data._id);
      const URL = `http://localhost:8000/user?id=${user._id}`;
      fetch(URL, {
        method: "PATCH",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.updateCount > 0) {
            toast("The seller is Successfully verified");
            refetch();
          }
        });
    }
  };

  const handleDelete = (user) => {
    console.log(user._id);
    //console.log(data._id);
    const URL = `http://localhost:8000/user?id=${user._id}`;
    fetch(URL, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast("Seller User Deleted Successfully");
          refetch();
        }
      });
  };
  const closeModal = () => {
    setSelectedSeller(null);
  };

  return (
    <div>
      <h1 className="text-3xl text-left">My Products</h1>
      <div className="overflow-x-auto">
        <table className="table w-full my-5">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>email</th>
              <th>Seller Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allSeller?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.verified === true ? (
                    <p className="text-success">verified</p>
                  ) : (
                    <button
                      onClick={() => verify(user)}
                      className="btn btn-success"
                    >
                      Verify
                    </button>
                  )}
                </td>

                <td>
                  <label
                    htmlFor="confirmationModal"
                    onClick={() => setSelectedSeller(user)}
                    className="btn btn-danger"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedSeller && (
          <ConfirmationModal
            title={"Are you sure you want to delete?"}
            message={`if you delete ${selectedSeller.name}. It can not be undone`}
            modalData={selectedSeller}
            successAction={handleDelete}
            closeModal={closeModal}
          ></ConfirmationModal>
        )}
      </div>
    </div>
  );
};

export default AllSellers;
