import { async } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthUserContext } from "../../../AuthContext/AuthContext";
import Loading from "../../../Component/Loading/Loading";
import useRole from "../../../hooks/useRole";
import BookingModal from "../../BookingModal/BookingModal";
import Categories from "../Categories/Categories";
import CategoryWiseProduct from "../CategoryWiseProducts/CategoryWiseProduct";
import Notice from "../Notice/Notice";

const AdvertisedItems = () => {
  const [product, setProduct] = useState(null);
  const { user } = useContext(AuthUserContext);
  const [role, isRoleLoading] = useRole(user?.email);
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
      {data?.map((product) => (
        <CategoryWiseProduct
          key={product._id}
          product={product}
          role={role}
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
