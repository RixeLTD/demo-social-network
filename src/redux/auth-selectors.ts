import {AppStateType} from "./redux-store";

export const getLoginFormErrors = (state: AppStateType) => {
    return state.me.errorMessage;
}

export const getIsAuth = (state: AppStateType) => {
    return state.me.isAuth;
}

export const getIsCaptcha = (state: AppStateType) => {
    return state.me.isCaptcha;
}