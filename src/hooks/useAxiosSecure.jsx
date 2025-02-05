import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextApi } from '../AuthProvider/AuthContext';

export const axiosSecure = axios.create({
    baseURL:'https://bistro-boss-server-sepia-five.vercel.app/'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useContext(ContextApi);
    axiosSecure.interceptors.request.use(function (config){
        const token = localStorage.getItem('access-token')
        // console.log('request interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error){
        return Promise.reject(error)
    });

    // interceptors 401 and 403 status

    axiosSecure.interceptors.response.use(function (response) {
        return response;
      }, async(error) =>{
        const status = error.response.status;
        console.log('status error in the interceptors', error)
        if(status === 401 || status === 403 ){
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
      });


    return axiosSecure;
};

export default useAxiosSecure;