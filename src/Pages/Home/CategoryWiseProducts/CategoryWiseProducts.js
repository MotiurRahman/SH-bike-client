import React, { useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loading from "../../../Component/Loading/Loading";
import BookingModal from "../../BookingModal/BookingModal";
import Categories from "../Categories/Categories";

import CategoryWiseProduct from "./CategoryWiseProduct";

const CategoryWiseProducts = () => {
  const [product, setProduct] = useState(null);
  const products = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Loading></Loading>;
  }

  return (
    <div className="grid md:grid-flow-col grid-flow-row mb-10">
      <div className="col-span-12 md:col-span-2 my-5">
        <Categories></Categories>
      </div>
      <div className="col-span-12 md:col-span-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {products?.map((product) => (
            <CategoryWiseProduct
              key={product._id}
              product={product}
              setProduct={setProduct}
            ></CategoryWiseProduct>
          ))}
        </div>
        {product && (
          <BookingModal
            product={product}
            setProduct={setProduct}
          ></BookingModal>
        )}
      </div>
    </div>
  );
};

export default CategoryWiseProducts;
