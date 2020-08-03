import axios from 'axios';
import axiosWithAuth from '../../components/auth/axiosWithAuth';
import { SET_POSTS, NEW_POST, LOADING_UI, DELETE_POST } from '../types';

export const addNewPost = post => async dispatch => {
    try {
        const response = await axiosWithAuth().post(`/post`, post)
        const postId = response.data.post.id;
        dispatch({ type:NEW_POST, payload: {
            postId,
            ...response.data.post 
        }})
    }
    catch(error) {
        console.log(error)
    }
}
export const getAllPosts = () => async dispatch => {
    // dispatch({ type:LOADING_UI });
    try {
        const response = await axios.get('https://face-browser.herokuapp.com/api/post')
        dispatch({ type:SET_POSTS, payload: response.data})
    }
    catch(error) {
        console.log(error)
    }
}
export const deletePost = postId => dispatch => {
    try {
        axiosWithAuth().delete(`/post/${postId}`)
        dispatch({ type:DELETE_POST, payload: postId })
    }
    catch(error) {
        console.log(error)
    }
}