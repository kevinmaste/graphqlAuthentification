import React from 'react';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import styled from "styled-components";
const PrivateHome = () => {
    const users = useAuth()
    const navigate =useNavigate()
    const logout =()=>{
        console.log('we logout')
        localStorage.clear()
        navigate('/login')
    }
   return(
       <div>
           <Typo1>
               welcome to the connected pages
           </Typo1>
           <Typo>{users.name}</Typo>
           <DivButton>
               <button onClick={logout}>logout</button>
           </DivButton>
       </div>
   )
};

export default PrivateHome;
const Typo = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 25px;
`
const Typo1 = styled.p`
  text-transform: uppercase;
  font-weight: 500;
`
const DivButton = styled.div`
  text-align: center;
  button{
    width: 100%;
    height:50px;
    text-transform: uppercase;
    border: none;
    transition:0.5s;
  }
  button:hover{
    background-color:darkblue;
    cursor:pointer;
  }
  //margin: auto;
`
