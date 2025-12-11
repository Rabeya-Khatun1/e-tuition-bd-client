import React from 'react';
import useRole from '../Hooks/useRole'
import useAuth from '../Hooks/useAuth';
import Loading from '../Components/Loading/Loading'
import ErrorPage from '../Pages/ErrorPage/ErrorPage';

const AdminRoutes = ({children}) => {

const {role, roleLoading} =useRole();
const {user, loading} = useAuth();

if(!user || roleLoading || loading){
    return <Loading></Loading>
}

if(role !== 'admin'){
    return <ErrorPage></ErrorPage>
}

    return children
};

export default AdminRoutes;