import axios from 'axios';
import axiosWithAuth from '../../components/auth/axiosWithAuth';
import { setErrors, clearAllErrors } from './uiActions';
import { SET_USER, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER_DATA } from '../types';

export const getUserInfo = () => async dispatch => {
    dispatch({ type:LOADING_USER_DATA })
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

export const imageUpload = async imgInfo => {
    if(!imgInfo.imgFile) {
        return `${process.env.REACT_APP_DEFAULT_IMAGE}`;
    }

    const imageData = new FormData();
    const image = imgInfo.imgFile[0]
    imageData.append('upload_preset', `${process.env.REACT_APP_USER_IMAGE_PRESET}`)
    imageData.append('file', image);
    try {
        const imageUrl = await axios.post(`${process.env.REACT_APP_IMAGE_UPLOAD_URL}`, imageData)
        return await imageUrl.data.secure_url;
    }
    catch(error) {
        return `${process.env.REACT_APP_DEFAULT_IMAGE}`;
    }
}

export const editUserDetails = (imgInfo) => async dispatch => {
    dispatch({ type:LOADING_USER_DATA })
    try {
        const newUserImage = await imageUpload(imgInfo) 
        await axiosWithAuth().put('/user', {
            imageUrl: newUserImage
        })
    }   
    catch(error) {
        console.log(error)
    }
}
