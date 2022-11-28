import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../Component/Loading/Loading";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://server-sh-bike-motiurrahman.vercel.app/allcategories")
      .then(function (response) {
        // handle success
        //console.log(response.data);
        setCategories(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  if (categories.length === 0) {
    return <Loading></Loading>;
  }
  return (
    <div className="card md:w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">All Catagories!</h2>
        {categories.map((categoy) => (
          <Link key={categoy._id} to={`/category/${categoy.categoryName}`}>
            {categoy.categoryName} Bike
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
