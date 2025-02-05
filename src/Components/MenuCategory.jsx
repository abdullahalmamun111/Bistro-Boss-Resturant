import React from "react";
import MenuItem from "../Shared/MenuItem";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title }) => {
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-4 my-2">
        {items.map((item) => (
          <MenuItem item={item}></MenuItem>
        ))}

      </div>
      <div className="text-center mb-4">
       <Link to={`/shop/${title}`}>
          <button
            className="btn bg-gray-500 w-[160px] btn-outline mt-6 border-yellow-500
                    border-0 border-b-4 text-yellow-500 hover:bg-yellow-500 hover:text-black"
          >
            Order Now
          </button>
        </Link>
       </div>
    </section>
  );
};

export default MenuCategory;
