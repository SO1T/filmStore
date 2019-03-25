import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGIN_FAIL
} from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
            type: AUTH_ERROR
            })
        })
};


export const tokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
};