import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const MyProducts = () => {
  //const myproducts = useLoaderData();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: myproducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myproducts"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:8000/myproducts", {
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

  const handleDelete = (product) => {
    console.log(product._id);
    //console.log(data._id);
    const URL = `http://localhost:8000/myproducts?id=${product._id}`;
    fetch(URL, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast("Product Deleted Successfully");
          refetch();
        }
      });
  };
  const closeModal = () => {
    setSelectedProduct(null);
  };

  // advertise your product
  const advertise = (id) => {
    if (window.confirm("Would you like to to advertise this product?")) {
      fetch(`http://localhost:8000/myproducts?id=${id}`, {
        method: "PATCH",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.acknowledged) {
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
              <th>Name</th>
              <th>Price</th>
              <th>Purchase Year</th>
              <th>Sale_Status</th>
              <th>Advertise</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myproducts?.map((product, index) => (
              <tr key={product._id}>
                <th>{index + 1}</th>
                <td>{product.productName}</td>
                <td>{product.price}</td>
                <td>{product.purchaseYear}</td>
                <td>{product?.saleStatus}</td>
                <td>
                  {product?.saleStates === "sold" ? (
                    <button className="btn btn-success" disabled="true">
                      Advertise
                    </button>
                  ) : (
                    <button
                      onClick={() => advertise(product._id)}
                      className="btn btn-success"
                      disabled={product?.advertise}
                    >
                      {" "}
                      Advertise
                    </button>
                  )}
                </td>

                <td>
                  <label
                    htmlFor="confirmationModal"
                    onClick={() => setSelectedProduct(product)}
                    className="btn btn-danger"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedProduct && (
          <ConfirmationModal
            title={"Are you sure you want to delete?"}
            message={`if you delete ${selectedProduct.productName}. It can not be undone`}
            modalData={selectedProduct}
            successAction={handleDelete}
            closeModal={closeModal}
          ></ConfirmationModal>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
