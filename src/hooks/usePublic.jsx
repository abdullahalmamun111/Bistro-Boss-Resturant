import axios from 'axios';
import React from 'react';


const axiosPublic = axios.create({
    baseURL:'https://bistro-boss-server-sepia-five.vercel.app/'
})
const usePublic = () => {

    return axiosPublic ;
};

export default usePublic;