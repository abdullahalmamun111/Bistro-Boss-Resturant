import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { ContextApi } from "../AuthProvider/AuthContext";
import Loading from "../Components/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {loading} = useContext(ContextApi)
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
      });
      return res.data;
    },
  });

  const hanleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch()
        Swal.fire({
          title: "Good job!",
          text: `${user.name} is an admin Now !`,
          icon: "success",
        });
      }
    });
  };

  const hanleUserDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`users/${user._id}`).then((res) => {
          console.log(res);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Cart has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  
  if(loading){
    return <Loading></Loading>
  }
  else{
      return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  { item.role === 'admin' ? 'Admin': <button
                    onClick={() => hanleMakeAdmin(item)}
                    className="btn text-2xl bg-yellow-500"
                  >
                    <FaUsers className="text-white"></FaUsers>
                  </button>}
                </td>

                <td>
                  <button
                    onClick={() => hanleUserDelete(item)}
                    className="btn text-2xl text-red-600"
                  >
                    <FaTrash></FaTrash>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  }

};

export default AllUsers;
