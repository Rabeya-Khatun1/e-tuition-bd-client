import React from 'react';
import useRole from '../../Hooks/useRole';
import UserDashboard from '../Dashboard/UserDashboard'
import TutorDashboard from '../Dashboard/TutorDashboard'
import AdminDashboard from '../Dashboard/AdminDashboard'
import Loading from '../../Components/Loading/Loading'

const Dashboard = () => {

    const {role, roleLoading }= useRole();
if(roleLoading){
    return <Loading></Loading>
}

if(role === 'admin'){
    return <AdminDashboard></AdminDashboard>
}
else if(role === 'tutor'){
    return <TutorDashboard></TutorDashboard>
}
return <UserDashboard></UserDashboard>
   
};

export default Dashboard;