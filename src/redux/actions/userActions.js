import { SET_USER, SET_ERRORS, CLEAR_ERRORS } from '../types';
import axios from 'axios';

export const loginUser = (user, history) => dispatch => {
    axios.post('http://localhost:1337/api/auth/login', user)
    .then(res => {
        localStorage.setItem('token', res.data.token)
        // dispatch({
        //    type: SET_USER,
        //    payload: res.data 
        // })
        clearErrors();
        history.push('/');
    })
    .catch(error => {
        // if(error.response.data.message.userHandle || error.response.data.message.password) {
        //     dispatch({
        //         type: SET_ERRORS,
        //         payload: { ...error.response.data }
        //     })
        //     // setErrors({
        //     //     ...error.response.data
        //     // }, console.log(errors))
        //     return;
        // }

        dispatch({
            type: SET_ERRORS,
            payload: error.response.data
        })
        // setErrors({
        //     ...errors,
        //     invalidCreds: error.response.data.message
        // }, console.log(errors))
    })
}

export const clearErrors = (test) => dispatch => {
    console.log('ok clearing...')
    dispatch({ type: CLEAR_ERRORS });
}