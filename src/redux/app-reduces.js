import { getUserData } from "./auth-reduces";

const INITIALIZED_SUCCESS = 'APP_INITIALIZED_SUCCESS';
const SET_GLOBAL_ERROR = 'APP_SET_GLOBAL_ERROR';

let initialState = {
    initialized: false,
    globalError: null,
};

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
})

export const setGlobalError = (error) => ({
    type: SET_GLOBAL_ERROR, error
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
        default:
            return state;
    }
}

export const initializeApp = () => async (dispatch) => {
    await dispatch(getUserData());
    dispatch(initializedSuccess());
}

export default appReducer;