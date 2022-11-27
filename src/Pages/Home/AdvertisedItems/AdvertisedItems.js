import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Loading from "../../../Component/Loading/Loading";
import BookingModal from "../../BookingModal/BookingModal";
import Categories from "../Categories/Categories";
import CategoryWiseProduct from "../CategoryWiseProducts/CategoryWiseProduct";
import Notice from "../Notice/Notice";

const AdvertisedItems = () => {
  const [product, setProduct] = useState(null);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/advertise");
      const products = await res.json();
      return products;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
      {data?.map((product) => (
        <CategoryWiseProduct
          key={product._id}
          product={product}
          setProduct={setProduct}
        ></CategoryWiseProduct>
      ))}

      {product && (
        <BookingModal product={product} setProduct={setProduct}></BookingModal>
      )}
    </div>
  );
};

export default AdvertisedItems;
