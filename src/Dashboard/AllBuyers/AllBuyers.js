import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const AllBuyers = () => {
  //const myproducts = useLoaderData();
  const [selectedBuyers, setSelectedBuyers] = useState(null);

  const {
    data: allSeller = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allsellers"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:8000/allbuyers", {
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

  const handleDelete = (user) => {
    console.log(user);
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
    setSelectedBuyers(null);
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
              <th>Role</th>
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
                  <button className="btn btn-success">Make Admin</button>
                </td>

                <td>
                  <label
                    htmlFor="confirmationModal"
                    onClick={() => setSelectedBuyers(user)}
                    className="btn btn-danger"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedBuyers && (
          <ConfirmationModal
            title={"Are you sure you want to delete?"}
            message={`if you delete ${selectedBuyers.name}. It can not be undone`}
            modalData={selectedBuyers}
            successAction={handleDelete}
            closeModal={closeModal}
          ></ConfirmationModal>
        )}
      </div>
    </div>
  );
};

export default AllBuyers;
