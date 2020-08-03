import { SET_POSTS, NEW_POST, DELETE_POST } from '../types';

const initialState = {
    posts:[]
}

export default (state=initialState, action) => {
    switch(action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case NEW_POST:
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts
                ]
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.postId !== action.payload)
            }
        default:
            return state;
    }
}