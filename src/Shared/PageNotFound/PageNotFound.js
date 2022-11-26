import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../../Assets/images/error.jpg";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center">
      <img className="w-1/2 h-1/2" src={errorImg} alt="" />
      <div className="mt-5">
        <h3>Oops 404</h3>
        <p>
          Sorry, there's no page at that URL. You can go{" "}
          <Link className="text-red-500" to="/">
            Back to Home Page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
