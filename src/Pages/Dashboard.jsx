import React from "react";
import {
  FaAd,
  FaBars,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();


  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils></FaUtensils> Add Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageitems">
                  <FaList></FaList> Manage Items
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/bookings">
                  <FaBook></FaBook> Manage Bookinngs
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers> All Users
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/contact">
                  <FaEnvelope></FaEnvelope> Contact
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome></FaHome> User Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaCalendar></FaCalendar> Payment History
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart></FaShoppingCart> My Cart
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/review">
                  <FaAd></FaAd> Review
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/bookings">
                  <FaList></FaList> Bookings
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/contact">
                  <FaEnvelope></FaEnvelope> Contact
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          {/* shared nav menu */}
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/shop/salad">
              <FaBars></FaBars> Menu
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
