import { SET_ERRORS, CLEAR_ERRORS } from "../types";

export const setErrors = data => dispatch => {
    dispatch({ type: SET_ERRORS, payload: data})
}

export const clearAllErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}