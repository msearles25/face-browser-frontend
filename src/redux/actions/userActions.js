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

    // axiosWithAuth().get('/user')
    //     .then(res => {
    //         // console.log(res.data)
    //         dispatch({ type:SET_USER, payload: res.data})
    //     })
    //     .catch(error => {
    //         console.log(error.response)
    //     })
}

export const loginUser = (user, history) => dispatch => {
    dispatch({ type:LOADING_UI });
    axios.post('http://localhost:1337/api/auth/login', user)
    .then(res => {
        localStorage.setItem('token', res.data.token)
        dispatch(getUserInfo());
        dispatch({ type:SET_AUTHENTICATED })
        dispatch(clearAllErrors());
        history.push('/')
    })
    .catch(error => {
        dispatch(setErrors(error.response.data))
    })
}

export const registerUser = (newUser, imageUpload, imgInfo, history) => async dispatch => {
    dispatch({ type:LOADING_UI })
    try {
        const user = await axios.post('http://localhost:1337/api/auth/register', newUser);
        const userImage = await imageUpload(imgInfo);
        const { token } = await user.data;
        await axiosWithAuth().put(`/user`,{
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