import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {CREATE_USER} from "../graphqlClent";
import SpinnerComponents from "./Spinner.components";
import IsSentComponents from "./isSent.components";
import styled from "styled-components";

const RegisterComponents = () => {
    const [createUser,{data}]=useMutation(CREATE_USER)
    const [Error,setError]=useState()
    const [Email,setEmail]=useState()
    const [Password,setPassword]=useState()
    const [Nickname,setNickname]=useState()
    const [Name,setName]=useState()
    const navigate = useNavigate()
    //const [isSent,setIsSent]=useState(false)


    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await createUser({
                    variables: {
                        name: Name,
                        nickname: Nickname,
                        email: Email,
                        password: Password,
                    }
                }
            )
            setName('')
            setEmail('')
            setPassword('')
            setNickname('')
            navigate('/login')
        }catch (e) {
            console.log(e.message)
            setError(e.message)
        }

        //setIsSent(true)
    }
    console.log("data : ",data)
    //if (loading) return <SpinnerComponents/>

    return (
        <Container>
            {data?.createUser.isCreate && <IsSentComponents/>}
            {Error && <Errors>{Error}</Errors>}
            <h2>Register</h2>
            {/*error && <p>{error.message}</p>*/}
            {/*if the data is true , means that the user is Create*/}
            <form action="" onSubmit={handleSubmit}>
                <InputBox>
                    <input type="text" required placeholder="Name..." onChange={(e)=>setName(e.target.value)} />
                </InputBox>
                <InputBox>
                    <input type="text" required placeholder="Nickname..." onChange={(e)=>setNickname(e.target.value)} />
                </InputBox>
                <InputBox>
                    <input type="email" required placeholder="User@User.com" onChange={(e)=>setEmail(e.target.value)} />
                </InputBox>
                <InputBox>
                    <input type="password" required placeholder="password..." onChange={(e)=>setPassword(e.target.value)}/>
                </InputBox>
                <InputBox>
                    <input type="submit" value="Register"/>
                </InputBox>
            </form>
            <Typography>Already have an account click <Link to={"/login"}>Here</Link></Typography>
        </Container>
    );
};

export default RegisterComponents;

export const Errors = styled.p`
 text-align: center;
  color:red;
`
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






