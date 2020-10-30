export const getLoginFormErrors = (state) => {
    return state.auth.errorMessage;
}

export const getIsAuth = (state) => {
    return state.auth.isAuth;
}

export const getIsCaptcha = (state) => {
    return state.auth.isCaptcha;
}