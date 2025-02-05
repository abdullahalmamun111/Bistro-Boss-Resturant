import React, { useContext } from "react";
import { ContextApi } from "../AuthProvider/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
  const { user } = useContext(ContextApi);
  const axiosSecure = useAxiosSecure();

  const { data = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const stats = [
    { label: "Revenue", value: data.revenue, bg: "from-purple-400 to-purple-600", icon: "💰" },
    { label: "Customers", value: data.users, bg: "from-yellow-400 to-yellow-600", icon: "👥" },
    { label: "Products", value: data.menuItems, bg: "from-pink-400 to-pink-600", icon: "📦" },
    { label: "Orders", value: data.orders, bg: "from-blue-400 to-blue-600", icon: "🚚" },
  ];

  return (
    <div>
      <h2 className="text-3xl mb-4">
        Hi, Welcome {user?.displayName ? user.displayName : "Back"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${stat.bg} text-white p-4 rounded-lg shadow-md flex items-center justify-between`}
          >
            <div className="text-4xl">{stat.icon}</div>
            <div className="text-right">
              <h3 className="text-2xl font-bold">{stat.value || 0}</h3>
              <p className="text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
