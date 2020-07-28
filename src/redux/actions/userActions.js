import axios from 'axios';
import axiosWithAuth from '../../components/auth/axiosWithAuth';
import { setErrors, clearAllErrors } from './uiActions';
import { LOADING_UI } from '../types';

export const loginUser = (user, history) => dispatch => {
    dispatch({ type:LOADING_UI });
    axios.post('http://localhost:1337/api/auth/login', user)
    .then(res => {
        localStorage.setItem('token', res.data.token)
        dispatch(clearAllErrors())
        history.push('/')
    })
    .catch(error => {
        dispatch(setErrors(error.response.data))
    })
}

export const registerUser = (newUser, imageUpload, history) => async dispatch => {
    dispatch({ type:LOADING_UI })
    try {
        const user = await axios.post('http://localhost:1337/api/auth/register', newUser);
        const userImage = await imageUpload();
        const { token, id }= await user.data;
        await axiosWithAuth().put(`/user/${await id}`,{
            imageUrl: await userImage
        })
        localStorage.setItem('token', token)
        dispatch(clearAllErrors())
        history.push('/')
    } 
    catch(error) {
        dispatch(setErrors(error.response.data))
    }
}