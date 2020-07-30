import axios from 'axios';
import axiosWithAuth from '../../components/auth/axiosWithAuth';
import { SET_POSTS, NEW_POST } from '../types';

export const addNewPost = post => async dispatch => {
    try {
        const response = await axiosWithAuth().post(`/post`, post)
        console.log(response)
        dispatch({ type:NEW_POST, payload: response.data.post })
    }
    catch(error) {
        console.log(error)
    }
}
