import React from 'react';
import {Errors} from "./Register.components";

const ErrorCompoments = (props) => {
    return (
        <>
            <Errors>{props.error}</Errors>
        </>
    );
};

export default ErrorCompoments;
