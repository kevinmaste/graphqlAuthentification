import React from 'react';
import styled from "styled-components";

const IsSentComponents = () => {
    return (
        <>
            {/* here the message would display block and after seconde is none*/}
            <Sent>User is create</Sent>
        </>
    );
};

export default IsSentComponents;
const Sent = styled.p`
  color: lawngreen;
  font-weight: bold;
  text-align: center
`
