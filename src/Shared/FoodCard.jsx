import React, { useContext } from "react";
import { ContextApi } from "../AuthProvider/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCarts from "../hooks/useCarts";

const FoodCard = ({ item }) => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const { name, recipe, image, price, _id } = item;
  const { user } = useContext(ContextApi);
  const axiosSecure = useAxiosSecure();
  const [,refetch] = useCarts();
  const handleAddtoCart = () => {
    if (user && user.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure.post("/carts", cartItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: `${name} added to your cart`,
            icon: "success",
          });
          // refetch the cart to update the cart items count
          refetch()
        }
      });
    } else {
      Swal.fire({
        title: "Sorry You Are Not Logged In !",
        text: "Please Login To Add To The Cart ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: location.pathname });
        }
      });
    }
  };
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={image} alt={name} />
        <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded-lg text-sm font-semibold">
          ${price}
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-lg font-bold mb-2">{name}</h2>
        <p className="text-gray-600 text-sm mb-4">{recipe}</p>
        <button
          onClick={ handleAddtoCart}
          className="btn bg-slate-100 w-[160px] btn-outline mt-6 border-yellow-500
                    border-0 border-b-4 text-yellow-500 hover:bg-yellow-500 hover:text-black"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
