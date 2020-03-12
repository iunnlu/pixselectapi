import React from 'react';
import CustomCard from '../assets/CustomCard';
import { connect } from 'react-redux';
import { createUser } from '../actions';

const SignUp = ({ createUser }) => {
    return(
        <CustomCard componentName="Sign Up" submitForm={(username, password) => {
            createUser({
                username, password, role: "user"
            });
        }} />
    )
}

export default connect(null, {createUser})(SignUp);