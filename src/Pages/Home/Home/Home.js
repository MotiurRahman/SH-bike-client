import React from "react";
import Categories from "../Categories/Categories";
import Notice from "../Notice/Notice";
import Slider from "../Slider/Slider";

const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <div className="grid md:grid-flow-col grid-flow-row">
        <div className="col-span-12 md:col-span-2 my-5">
          <Categories></Categories>
          <Notice></Notice>
        </div>
        <div className="col-span-12 md:col-span-8">
          <h1>All Advertise products</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
