import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../Component/Loading/Loading";
import Categories from "../Categories/Categories";
import CategoryWiseProduct from "../CategoryWiseProducts/CategoryWiseProduct";
import Notice from "../Notice/Notice";

const AdvertisedItems = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
      {data?.map((product) => (
        <CategoryWiseProduct
          key={product._id}
          product={product}
        ></CategoryWiseProduct>
      ))}
    </div>
  );
};

export default AdvertisedItems;
