import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { MdEmail, MdAddCall } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-slate-200 shadow-md">
      <div className="flex justify-between max-w-6xl mx-auto p-3">
        <div className="grid grid-cols-2 gap-8 px-5 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h4>About Us</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
              Obcaecati distinctio illum rem eum, quae nulla laudantium iste,{" "}
              <br /> quaerat nemo explicabo consequatur fuga qui sequi sunt,{" "}
              <br /> vitae libero natus molestiae laboriosam?
            </p>
          </div>
          <div>
            <h4>Useful Links</h4>
            <ul>
              <li>International Shipping</li>
              <li>Privacy Policy</li>
              <li>Shipping Policy</li>
              <li>Terms and Conditions</li>
              <li>Refund and Cancellation Policy</li>
            </ul>
          </div>
          <div>
            <h4>Help and Contact</h4>
            <div className="flex items-center gap-3">
              <MdEmail />
              <p>twine.specialties@gmail.com</p>
            </div>
            <div className="flex items-center gap-3">
              <MdAddCall />
              <p>+91-9372484464</p>
            </div>
          </div>
          <div>
            <h4>Follow us</h4>
            <ul>
              <li>
                <div className="flex items-center gap-3">
                  <FaFacebookF />
                  <p className="uppercase">Facebook</p>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <IoLogoInstagram />
                  <p className="uppercase">Instagram</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
      <span class="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2024 <a href="https://flowbite.com/">Twine Specialties</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
