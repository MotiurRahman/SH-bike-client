import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/logo2.jpeg";
import { FaMapMarkerAlt, FaMobileAlt, FaRegEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="footer p-10 bg-base-200 text-base-content">
        <div className="text-left md:text-center">
          <img src={logo} className="h-16 md:mx-auto" alt="" />
          <p>
            Second Hand bike buy and sell
            <br />
            Quality service is our main concern.
          </p>
        </div>
        <div>
          <span className="footer-title">Categories</span>
          <Link to="" className="link link-hover">
            Indian Bike
          </Link>
          <Link to="" className="link link-hover">
            Japanese Bike
          </Link>
          <Link to="" className="link link-hover">
            Chinese Bike
          </Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link to="" className="link link-hover">
            HONDA
          </Link>
          <Link to="" className="link link-hover">
            TVS
          </Link>
          <Link to="" className="link link-hover">
            BAJAJ
          </Link>
          <Link to="" className="link link-hover">
            SUZUKI
          </Link>
        </div>
        <div>
          <span className="footer-title">Have a Question?</span>

          <li className="flex items-center">
            <span className="mr-2">
              <FaMapMarkerAlt></FaMapMarkerAlt>
            </span>
            <span className="text">545-West Kaziparaa Dhaka- 1216</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">
              <FaMobileAlt></FaMobileAlt>
            </span>
            <span className="text">+8801723306519</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2">
              {" "}
              <FaRegEnvelope></FaRegEnvelope>
            </span>
            <span className="text">motiur.mbstu@gmail.com</span>
          </li>
        </div>
      </div>
      <div className="bg-base-200 text-base-content">
        <p className="text-center">
          Copyright © 2022 - All right reserved by SH Bike BD
        </p>
      </div>
    </footer>
  );
};

export default Footer;
