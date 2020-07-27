import { SET_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {
    errors: {
        userHandle: null,
        password: null,
        message: null
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload
            }               
        case CLEAR_ERRORS:
            // check what field it is,
            // and then clear that fields error only
            switch(action.payload) {
                case 'userHandle':
                case 'password':
                    return {
                        ...state,
                        errors: {
                            ...state.errors,
                            [action.payload]: null
                        }
                    }
            }
            return {
                ...state,
                errors: null
            } 
        default:
            return state;
    }
}