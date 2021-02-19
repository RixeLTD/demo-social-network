export const getLoginFormErrors = (state: any) => {
    return state.auth.errorMessage;
}

export const getIsAuth = (state: any) => {
    return state.auth.isAuth;
}

export const getIsCaptcha = (state: any) => {
    return state.auth.isCaptcha;
}