import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    userPhoto: null,
    isAuth: false,
    isCaptcha: null,
};

export const setUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuth}
})

export const setCaptcha = (url) => ({
    type: SET_CAPTCHA,
    isCaptcha: url
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


export const loginUser = (formData) => async (dispatch) => {
    let response = await authAPI.login(formData.email, formData.password, formData.rememberMe, formData.captcha);

    if (response.data.resultCode === 0) {
        dispatch(getUserData());
    } else if (response.data.resultCode === 10) {
        let url = await authAPI.getCaptcha();
        dispatch(setCaptcha(url));
    } else {
        let message = response.data.messages ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("loginForm", {_error: message}));
    }
}

export const logoutUser = () => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
    } else {
        console.log(response.data.messages)
    }
}


export default authReducer;