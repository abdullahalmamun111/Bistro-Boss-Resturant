import React, { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ContextApi } from "../AuthProvider/AuthContext";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import useCarts from "../hooks/useCarts";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
  const [isAdmin] = useAdmin();
  const { user, logOut } = useContext(ContextApi);
  const [cart] = useCarts();
  const handleLogout = () => {
    logOut().then((result) => {
      Swal.fire({
        title: "Success!",
        text: "Log Out Sucessfull",
        icon: "success",
      });
    });
  };
  const navItems = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/menu"}>Menu</NavLink>
      </li>
      <li>
        <NavLink to={"/shop/salad"}>Shop</NavLink>
      </li>
      <li>
        <NavLink to={"/login"}>Login</NavLink>
      </li>
      {
        user && isAdmin && <li><Link to={'/dashboard/adminHome'}>Dashboard</Link></li>
      }
      {
        user && !isAdmin && <li><Link to={'/dashboard/userHome'}>Dashboard</Link></li>
      }
      <li>
        <Link to={'/dashboard/cart'} className="btn">
          <FaShoppingCart className="text-2xl"></FaShoppingCart>
          <div className="badge badge-secondary">+{cart.length}</div>
        </Link>
      </li>
    </>
  );
  return (
    <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl mx-auto bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent hover:bg-gradient-to-r hover:from-green-400 hover:via-blue-500 hover:to-purple-500">
          BISTRO<span className="text-blue-400">BOSS</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <button onClick={handleLogout} className="btn">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link className="btn" to={"/login"}>
              {" "}
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
