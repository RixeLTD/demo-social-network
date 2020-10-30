import {getUserData} from "./auth-reduces";

const INITIALIZED_SUCCESS = 'APP_INITIALIZED_SUCCESS';

let initialState = {
    initialized: false,
};

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS,
})

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
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