import { setErrors } from './uiActions';
import axios from 'axios';

export const loginUser = (user, history) => dispatch => {
    axios.post('http://localhost:1337/api/auth/login', user)
    .then(res => {
        localStorage.setItem('token', res.data.token)
        history.push('/')
    })
    .catch(error => {
        // if(error.response.data.userHandle || error.response.data.password) {
        //     setErrors({
        //         ...error.response.data
        //     }, console.log(errors))
        //     return;
        // }

        // setErrors({
        //     ...error.response.data
        // }, console.log(errors))

        dispatch(setErrors(error.response.data))
    })
}

export const registerUser = (newUser, imageUpload, history) => async dispatch => {
    try {
        const userImage = await imageUpload();
        const user = await axios.post('http://localhost:1337/api/auth/register', {
            ...newUser,
            imageUrl: userImage
        });
        localStorage.setItem('token', user.data.token)
        history.push('/')
    } 
    catch(error) {
        // setErrors({
        //     ...error.response.data
        // })
        dispatch(setErrors(error.response.data))
    }
}