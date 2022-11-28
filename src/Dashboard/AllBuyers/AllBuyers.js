import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../../Component/Loading/Loading";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const AllBuyers = () => {
  const [selectedBuyers, setSelectedBuyers] = useState(null);

  const {
    data: allBuyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBuyers"],
    queryFn: async () => {
      try {
        const res = await fetch(
          "https://server-sh-bike-motiurrahman.vercel.app/allbuyers",
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

  const handleDelete = (user) => {
    console.log(user);
    //console.log(data._id);
    const URL = `https://server-sh-bike-motiurrahman.vercel.app/user?id=${user._id}`;
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
      <h1 className="text-3xl text-left">All Buyers</h1>
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
            {allBuyers?.map((buyer, index) => (
              <tr key={buyer._id}>
                <th>{index + 1}</th>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>
                  <button className="btn btn-success">Make Admin</button>
                </td>

                <td>
                  <label
                    htmlFor="confirmationModal"
                    onClick={() => setSelectedBuyers(buyer)}
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
