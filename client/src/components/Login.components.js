import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {AUTH_LOGIN} from "../graphqlClent";
import ErrorCompoments from "./Error.compoments";
import {useToken} from "../hooks/useToken";
import styled from "styled-components";

const LoginComponents = () => {
    const [authLogin,{data,loading}]=useMutation(AUTH_LOGIN)
    const [Email,setEmail]=useState()
    const [Password,setPassword]=useState()
    const [Error,setError]=useState()
    const navigate =useNavigate()
    const [token,setToken]=useToken()

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            await authLogin({
                variables:{
                    password:Password,
                    email:Email
                }
            })
            if (data){
                console.log("je suis rentrer ici...")
                setToken(data.authLogin.token)
                navigate('/')
            }
        }catch (e) {
            console.log(e)
            setError(e.message)
        }
    }
    //console.log("the data is ",data)
    return (
        <Container>
            {Error && <ErrorCompoments error={Error}/>}
            <h2>Login</h2>
            <form action="" onSubmit={handleSubmit}>
                <InputBox>
                    <input type="Email" required  onChange={(e)=>setEmail(e.target.value)}/>
                    <span>Email</span>
                </InputBox>
                <InputBox>
                    <input type="password" required  onChange={(e)=>setPassword(e.target.value)} />
                    <span>Password</span>
                </InputBox>
                <InputBox>
                    <input type="submit" value="Connect" />
                </InputBox>
            </form>
            {/* put the color blue to "here"*/}
            <Typography>Have not an account click <Link to={'/register'}>Here</Link></Typography>
        </Container>
    );
};

export default LoginComponents;

const Container = styled.div`
  position: relative;
  padding:70px 40px;
  background: white;
  border-radius:20px;
  box-shadow:0 5px 25px rgba(0,0,0,0.2);
  
  h2{
    color: #111;
    margin-bottom: 45px;
    /*Chercher a quoi sa sert */
    line-height:1em;
    font-weight: 500;
    padding-left: 10px;
    border-left: 5px solid darkblue;
    
  }
`
const InputBox = styled.div`
  position: relative;
  width: 300px;
  height:46px;
  margin-bottom:35px;
  &:last-child{
    margin-bottom:0;
  }
  input{
    position:absolute;
    top: 0;
    left: 0;
    width:100%;
    border: 1px solid #111;
    background:transparent;
    padding: 10px;
    border-radius:4px;
    /*chercher aussi que fait cela */
    box-sizing: border-box;
    outline: none;
    font-size:16px;
    color:black;
    font-weight: 300;
  }
  span{
    position:absolute;
    top: 1px;
    left: 1px;
    padding:10px;
    display: inline-block;
    font-size:16px;
    color:black;
    font-weight: 300;
    transition: 0.5s;
    /*chercher aussi ce que ça fait , on faite c'est pour eviter que l'element soit pointer*/
    pointer-events: none;
    /*Revoir un peut les selecteur*/
  }
  input:focus ~ span, input:valid ~ span{
    transform: translateX(-10px) translateY(-32px);
    font-size: 12px;
  }
  input[type='submit']{
    background:#2196f3;
    color: white;
    border: none;
    cursor: pointer;
    font-weight: 500;
  }
  input[type='submit']:hover{
    background:forestgreen;
  }
  
`
const Typography =styled.p`
  text-align: center;
  padding-top:12px;
  a{
    text-decoration: none;
    font-size: 1rem;
    color: blue;
  }
`
