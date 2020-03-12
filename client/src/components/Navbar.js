import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import jwt from 'jwt-decode';
import history from '../history';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/index';

const CustomNavbar = ({ logoutUser }) => {
    const role = jwt(localStorage.getItem('token')).role;
    return (
        <Navbar style={{display:"flex", justifyContent:"space-between"}} bg="dark" variant="dark">
            <Navbar.Brand style={{cursor:"pointer"}} onClick={() => {
                if(role === "user")  history.push('/home')
                history.push('/admin')
            }}>{role === "user" ? "User Home" : "Admin Home"}</Navbar.Brand>
            <Button onClick={logoutUser} variant="info">Logout</Button>
        </Navbar>
    )
}

export default connect(null, {logoutUser})(CustomNavbar);