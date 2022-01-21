import React from 'react';
import {Navigate, Route} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const SecureRoutes = ({children}) => {
    console.log("elemennt of my props :",children)
    const users = useAuth()
    console.log("users is : ",users)
    return users ? children : <Navigate to={'/login'} replace/>
};

export default SecureRoutes;
