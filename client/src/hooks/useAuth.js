// the hooks will help to set user to true when to localStorage is ok
import {useToken} from "./useToken";
import {useEffect, useState} from "react";

export const useAuth =()=>{
   const [token]=useToken();

   const getPayload = (token)=>{
       const encodedPayload = token.split('.')[1]
       return JSON.parse(atob(encodedPayload))
   }

   const [user,setUser]=useState(()=>{
       if (!token) return null
       return getPayload(token)
   })
    useEffect(()=>{
        if (!token){
            setUser(null)
        }else {
            setUser(getPayload(token))
        }
    },[token])
    return user

}
