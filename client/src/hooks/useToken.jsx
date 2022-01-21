import {useState} from "react";

export const useToken=()=>{
   const  [token,setTheToken]=useState(()=>{
        return localStorage.getItem('users')
    })

    const setToken =(token)=>{
        localStorage.setItem('users',token)
        //we know that the token is taking the actual token , so we set the new
        setTheToken(token)
    }

    return [token,setToken]
}
