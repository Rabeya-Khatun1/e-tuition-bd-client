import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth'
import { useNavigate } from 'react-router';

const useAxiosSecure = () => {

const navigate = useNavigate();
    const {user, signOutUser} = useAuth()
const axiosSecure = axios.create({
    baseURL:'http://localhost:3000'
})

useEffect( ()=>{

    // request 
const requestInterceptors = axiosSecure.interceptors.request.use(config => {

    config.headers.Authorization=`Bearer ${user?.accessToken}`


     return config;

}
   
)
// response 
const responseInterceptors = axiosSecure.interceptors.response.use((response) =>{
    return response ;
}, error => {
    const statusCode = error?.response.status;
if(statusCode === 401 || statusCode === 403){
signOutUser()
.then(
    navigate('/login')
)
}

})

return ()=>{
    axiosSecure.interceptors.request.eject(requestInterceptors)
axiosSecure.interceptors.response.eject(responseInterceptors)
}


},[user, signOutUser, navigate])

return axiosSecure;
};

export default useAxiosSecure;