import axios from 'axios';
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
        // const userImage = await imageUpload();
        const user = await axios.post('http://localhost:1337/api/auth/register', newUser);
        const userImage = await imageUpload();
        await axios.put(`http://localhost:1337/api/user/${await user.data.id}`,{
            imageUrl: await userImage
        })
        localStorage.setItem('token', user.data.token)
        dispatch(clearAllErrors())
        history.push('/')
    } 
    catch(error) {
        // setErrors({
        //     ...error.response.data
        // })
        dispatch(setErrors(error.response.data))
    }
}