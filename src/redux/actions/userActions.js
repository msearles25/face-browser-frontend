import axios from 'axios';
import axiosWithAuth from '../../components/auth/axiosWithAuth';
import { setErrors, clearAllErrors } from './uiActions';
import { SET_USER, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';

export const getUserInfo = () => async dispatch => {
    try {
        const response = await axiosWithAuth().get('/user');
        const userInfo = await response.data
        dispatch({ type:SET_USER, payload: userInfo});
    }
    catch(error) {
        console.log(error)
    }
}
export const authUser = () => dispatch => {
    dispatch({ type:SET_AUTHENTICATED });
}
export const loginUser = (user, history) => async dispatch => {
    dispatch({ type:LOADING_UI });
    try {
        const userToken = await axios.post('http://localhost:1337/api/auth/login', user);
        localStorage.setItem('token', userToken.data.token)   
        dispatch(getUserInfo());
        dispatch(authUser())
        dispatch(clearAllErrors());
        history.push('/')
    }
    catch(error) {
        console.log(error)
        dispatch(setErrors(error.response.data))
    }
}
export const logoutUser = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type:SET_UNAUTHENTICATED });
}
export const registerUser = (newUser, imageUpload, imgInfo, history) => async dispatch => {
    dispatch({ type:LOADING_UI })
    try {
        const user = await axios.post('http://localhost:1337/api/auth/register', newUser);
        const userImage = await imageUpload(imgInfo);
        const { token } = await user.data;
        localStorage.setItem('token', token)
        await axiosWithAuth().put(`/user`,{
            imageUrl: userImage
        })
        dispatch(clearAllErrors())
        history.push('/')
    } 
    catch(error) {
        dispatch(setErrors(error.response.data))
    }
}