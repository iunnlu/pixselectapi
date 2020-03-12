import jwt from 'jwt-decode';
import { CREATE_USER, LOGIN_USER, LOGOUT_USER, CREATE_ACTİON } from './types';
import streams from '../api/streams';
import history from '../history';

export const createUser = (formValues) => dispatch => {
    streams.post('/register', formValues)
        .then((response) => {
            dispatch({
                type: CREATE_USER,
                payload: response.data
            })
            if (response.data.statusCode === 201) history.push('/')
        }).catch((err) => {
            dispatch({
                type: "USER_ERROR",
                payload: err
            })
        })
}

export const loginUser = (formValues) => dispatch => {
    streams.post('/login', formValues)
        .then((response) => {
            dispatch({
                type: LOGIN_USER,
                payload: response.data
            })
            const decodedToken = jwt(response.data.user);
            if (response.data.statusCode === 200) {
                localStorage.setItem('token', response.data.user);
                if (decodedToken.role === "user") history.push('/home');
                if (decodedToken.role === "admin") history.push('/admin');
            }
        })
        .catch((err) => {
            dispatch({
                type: "USER_ERROR",
                payload: err
            })
        })
}

export const logoutUser = () => dispatch => {
    const userId = jwt(localStorage.getItem('token'))._id;
    streams.post('/logout', {userId})
        .then((response) => {
            if (response.data.statusCode === 200) {
                localStorage.removeItem('token');
                dispatch({
                    type: LOGOUT_USER,
                    payload: {}
                })
                history.push('/');
            }
        })
}

export const createStreamAction = (formValues) => dispatch => {
    streams.post('/actions/streams', formValues)
        .then((response) => {
            if(response.data.statusCode === 200) {
                dispatch({
                    type: CREATE_ACTİON,
                    payload: response.data.action
                })
            }
        })
}