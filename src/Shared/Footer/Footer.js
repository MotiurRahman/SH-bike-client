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
          <span className="footer-title">Services</span>
          <Link to="" className="link link-hover">
            Branding
          </Link>
          <Link to="" className="link link-hover">
            Design
          </Link>
          <Link to="" className="link link-hover">
            Marketing
          </Link>
          <Link to="" className="link link-hover">
            Advertisement
          </Link>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <Link to="" className="link link-hover">
            About us
          </Link>
          <Link to="" className="link link-hover">
            Contact
          </Link>
          <Link to="" className="link link-hover">
            Jobs
          </Link>
          <Link to="" className="link link-hover">
            Press kit
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
        <p>Copyright © 2022 - All right reserved by SH Bike BD</p>
      </div>
    </footer>
  );
};

export default Footer;
