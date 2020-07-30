import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER, LOADING_USER_DATA } from '../types';

const initialState = {
    authed: false,
    info: {},
    loadingUser: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authed: true
            }
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                ...state,
                info: { ...action.payload },
                loadingUser: false
            }
        case LOADING_USER_DATA:
            return {
                ...state,
                loadingUser: true
            }
        default:
            return state;
    }
}