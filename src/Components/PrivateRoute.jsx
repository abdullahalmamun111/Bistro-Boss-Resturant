import React, { useContext } from 'react';
import { ContextApi } from '../AuthProvider/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Loading';


const PrivateRoute = ({children}) => {
    const location = useLocation();
    // console.log(location)

    const {user,loading} = useContext(ContextApi);

    if(loading){
        return <Loading></Loading>
    }

    if(user){
        return children ;
    }
    return (
        <Navigate state={location.pathname} to={'/login'}></Navigate>
    );
};

export default PrivateRoute;