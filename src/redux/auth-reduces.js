import {authAPI} from "../api/api";

const SET_USER_DATA = 'AUTH_SET_USER_DATA';
const SET_CAPTCHA = 'AUTH_SET_CAPTCHA';
const SET_ERRORS = 'AUTH_SET_ERRORS';

let initialState = {
    userId: null,
    email: null,
    login: null,
    userPhoto: null,
    isAuth: false,
    isCaptcha: null,
    errorMessage: null,
};

const setUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuth}
})

const setCaptcha = (url) => ({
    type: SET_CAPTCHA,
    isCaptcha: url
})

const setLoginFormErrors = (message) => ({
    type: SET_ERRORS,
    message
})

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case SET_CAPTCHA:
            return {
                ...state,
                isCaptcha: action.isCaptcha,
            }
        case SET_ERRORS:
            return {
                ...state,
                errorMessage: action.message,
            }
        default:
            return state;
    }
}

export const getUserData = () => async (dispatch) => {
    let data = await authAPI.auth()

    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setUserData(id, email, login, true));
    }
}

export const getCaptcha = () => async (dispatch) => {
    let url = await authAPI.getCaptcha();
    dispatch(setCaptcha(url));
}

export const loginUser = (formData) => async (dispatch) => {
    let response = await authAPI.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    dispatch(setLoginFormErrors(null));
    if (response.data.resultCode === 0) {
        dispatch(getUserData());
        dispatch(setCaptcha(null));
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptcha());
        }
        dispatch(setLoginFormErrors(response.data.messages[0]));
    }
}

export const logoutUser = () => async (dispatch) => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
        dispatch(setLoginFormErrors(null));
    }
    if (data.resultCode === 1) {
        dispatch(setLoginFormErrors(data.messages[0]));
    }
}

export default authReducer;