import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1>Twine Specialties</h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button>
            <FaSearch className="text-slate-500" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/resin-calculator">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Resin Calculator
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <CgProfile className="rounded-full h-7 w-7 object-cover" />
            ) : (
              <li className=" text-slate-700 hover:underline">Sign In</li>
            )}
          </Link>
          <Link to="/cart">
            <button>
              <FaShoppingCart className="text-slate-500" />
            </button>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
