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
export const getMyPhoto = (state: AppStateType) => {
    return state.me.photo;
}
export const getMyName = (state: AppStateType) => {
    return state.me.fullName;
}
export const getAuthUserId = (state: AppStateType) => {
    return state.me.userId
}
export const selectIsFetching = (state: AppStateType) => {
    return state.me.isFetching
}