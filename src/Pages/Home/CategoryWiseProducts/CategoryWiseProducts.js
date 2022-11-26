import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loading from "../../../Component/Loading/Loading";
import CategoryWiseProduct from "./CategoryWiseProduct";

const CategoryWiseProducts = () => {
  const products = useLoaderData();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1>category product {products.length}</h1>
      {products.map((product) => (
        <CategoryWiseProduct
          key={product._id}
          product={product}
        ></CategoryWiseProduct>
      ))}
    </div>
  );
};

export default CategoryWiseProducts;
