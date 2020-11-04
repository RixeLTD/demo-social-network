import {getUserData} from "./auth-reduces";

const INITIALIZED_SUCCESS = 'APP_INITIALIZED_SUCCESS';
const SET_GLOBAL_ERROR = 'APP_SET_GLOBAL_ERROR';
const IS_GLOBAL_ERROR = 'APP_IS_GLOBAL_ERROR';

let initialState = {
    initialized: false,
    globalError: null,
    isVisibleGlobalError: false,
};

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
})

export const setGlobalError = (error) => ({
    type: SET_GLOBAL_ERROR, error
})

export const setIsVisibleGlobalError = (value) => ({
    type: IS_GLOBAL_ERROR, value
})

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        case SET_GLOBAL_ERROR:
            return {
                ...state,
                globalError: action.error,
            }
        case IS_GLOBAL_ERROR:
            return {
                ...state,
                isVisibleGlobalError: action.value,
            }
        default:
            return state;
    }
}

export const initializeApp = () => async (dispatch) => {
    await dispatch(getUserData());
    dispatch(initializedSuccess());
}

export default appReducer;