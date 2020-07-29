import axios from 'axios';
import axiosWithAuth from '../../components/auth/axiosWithAuth';
import { setErrors, clearAllErrors } from './uiActions';
import { SET_USER, LOADING_UI, SET_AUTHENTICATED } from '../types';

export const getUserInfo = () => async dispatch => {

    try {
        const response = await axiosWithAuth().get('/user');
        const userInfo = await response.data
        console.log(userInfo)
        dispatch({ type:SET_USER, payload: userInfo});
    }
    catch(error) {
        console.log(error)
    }
}

export const loginUser = (user, history) => async dispatch => {
    dispatch({ type:LOADING_UI });
    try {
        const userToken = await axios.post('http://localhost:1337/api/auth/login', user);
        localStorage.setItem('token', await userToken.data.token)   
        dispatch(getUserInfo());
        dispatch({ type:SET_AUTHENTICATED })
        dispatch(clearAllErrors());
        history.push('/')
    }
    catch(error) {
        console.log(error)
        dispatch(setErrors(error.response.data))
    }
}

export const registerUser = (newUser, imageUpload, imgInfo, history) => async dispatch => {
    dispatch({ type:LOADING_UI })
    try {
        const user = await axios.post('http://localhost:1337/api/auth/register', newUser);
        const userImage = await imageUpload(imgInfo);
        const { token } = await user.data;
        localStorage.setItem('token', await token)
        await axiosWithAuth().put(`/user`,{
            imageUrl: await userImage
        })
        dispatch(clearAllErrors())
        history.push('/')
    } 
    catch(error) {
        dispatch(setErrors(error.response.data))
    }
}