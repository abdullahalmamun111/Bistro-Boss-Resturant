import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import {
    useQuery,
  } from "@tanstack/react-query";
import { ContextApi } from '../AuthProvider/AuthContext';

const useCarts = () => {
   const {user} = useContext(ContextApi)
  //  console.log(user)
   const axiosSecure = useAxiosSecure();
   const { refetch,data: cart= []} = useQuery({
    queryKey:['cart',user?.email],
    queryFn: async () => {
        const res = await axiosSecure.get(`/carts?email=${user.email}`)
        return res.data;
    }
   })
   return [cart,refetch];
};

export default useCarts;