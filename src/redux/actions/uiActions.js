import { CLEAR_ERRORS } from '../types';

export const clearErrors = name => dispatch => {
    dispatch({ type: CLEAR_ERRORS, payload: name });
}