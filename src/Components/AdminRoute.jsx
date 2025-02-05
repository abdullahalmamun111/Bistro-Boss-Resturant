import React, { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import { ContextApi } from '../AuthProvider/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Loading';

const AdminRoute = ({children}) => {
    const {user,loading} = useContext(ContextApi);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    // console.log(location)

    if(loading || isAdminLoading){
        return <Loading></Loading>
    }

    if(user && isAdmin){
        return children ;
    }
    return (
        <Navigate state={location.pathname} to={'/'}></Navigate>
    );
};

export default AdminRoute;