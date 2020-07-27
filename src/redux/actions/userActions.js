import { SET_USER, SET_ERRORS } from '../types';
import { clearErrors } from './uiActions';
import axios from 'axios';

export const loginUser = (user, history) => dispatch => {
    axios.post('http://localhost:1337/api/auth/login', user)
    .then(res => {
        localStorage.setItem('token', res.data.token)
        // dispatch({
        //    type: SET_USER,
        //    payload: res.data 
        // })
        dispatch(clearErrors());
        history.push('/');
    })
    .catch(error => {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data
        })
    })
}
