import React from 'react';
import CustomCard from '../assets/CustomCard';
import { loginUser } from '../actions/index';
import { connect } from 'react-redux';

const Login = ({ loginUser }) => {
    return (
        <CustomCard componentName="Login" submitForm={(username, password) => {
            loginUser({
                username, password
            })
        }} />
    )
}

export default connect(null, {loginUser})(Login);