import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import NaveBar from "../Shared/NaveBar/NaveBar";

const Main = () => {
  return (
    <div className="flex flex-col h-screen">
      <NaveBar></NaveBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
