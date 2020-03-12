import React from 'react';
import history from './history';
import jwt from 'jwt-decode';

export const authAdmin = (WrappedComponent) => {
    return class extends React.Component {
        state = { token:"", role:"" };
        componentDidMount() {
            const token = localStorage.getItem('token');
            if (token) var role = jwt(token).role;
            this.setState({ token, role })
        }
        render() {
            if (this.state.token) {
                if (this.state.role === "admin") {
                    return (
                        <WrappedComponent {...this.props} />
                    )
                }
                if (this.state.role === "user") history.push('/home');
            }
            return (
                <div>Access Denied</div>
            )
        }
    };
};

export const authUser = (WrappedComponent) => {
    return class extends React.Component {
        state = { token: "" };
        componentDidMount() {
            const token = localStorage.getItem('token');
            this.setState({ token })
        }
        render() {
            if (this.state.token) {
                return (
                    <WrappedComponent {...this.props} />
                )
            }
            return (
                <div>Access Denied</div>
            )
        }
    };
};