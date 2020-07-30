import { SET_POSTS, NEW_POST } from '../types';

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
        default:
            return state;
    }
}