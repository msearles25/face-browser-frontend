import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER } from '../types';

const initialState = {
    authed: false,
    info: {}
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
                info: { ...action.payload }
            }
        default:
            return state;
    }
}