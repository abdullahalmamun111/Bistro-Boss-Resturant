import React from "react";
import SectionTitle from "../Components/SectionTitle";
import useMenu from "../hooks/useMenu";
import { FaEdit, FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MangeItems = () => {
  const axiosSecure = useAxiosSecure();
  const handleDelete =(item) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then( async (result) => {
        if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/menu/${item._id}`);
            
            if(res.data.deletedCount > 0 ){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${item.name} has been Deleted`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
      });
  }  

  const handleUpdate = (item) => {

  }
  const [menu,loading,refetch] = useMenu();
  return (
    <div>
      <div>
        <SectionTitle
          subtitle={"Hurry Up!"}
          title={"MANAGE ALL ITEMS"}
        ></SectionTitle>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                menu.map((item,index) =>  <tr key={item._id}>
                    <th>
                      {index+1}
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                    
                    {item.name}
                    </td>
                    <td>{item.price}</td>
                    <td>
                    <Link to={`/dashboard/updateItem/${item._id}`}>
                    <button
                    onClick={() => handleUpdate(item)}
                    className="btn btn-md bg-yellow-500"
                  >
                    <FaEdit className="text-white"></FaEdit>
                  </button>
                    </Link>
                    </td>
                    <td>
                    <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost btn-lg text-red-700"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                    </td>
                  </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MangeItems;
