import {authAPI, profileAPI, ResultCodes} from "../api/api"
import {AppActionsTypes, appActions} from "./app-reduces"
import {ThunkType} from "../types/types";
import {InferActionTypes} from "./redux-store";

export type InitialStateType = typeof initialState
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    fullName: null as string | null,
    photo: null as string | null,
    isAuth: false,
    isCaptcha: null as string | null,
    errorMessage: null as string | null,
}

export type AuthActionsTypes = InferActionTypes<typeof authActions>
const authActions = {
    setUserData: (userId: number | null, email: string | null, login: string | null, fullName: string | null, photo: string | null, isAuth: boolean) => ({
        type: "AUTH_SET_USER_DATA",
        payload: {userId, email, login, fullName, photo, isAuth}
    } as const),
    setCaptcha: (url: string | null) => ({
        type: "AUTH_SET_CAPTCHA",
        url: url
    } as const),
    setLoginFormErrors: (message: string | null) => ({
        type: "AUTH_SET_ERRORS",
        message
    } as const),
}
const authReducer = (state = initialState, action: AuthActionsTypes): InitialStateType => {
    switch (action.type) {
        case "AUTH_SET_USER_DATA":
            return {
                ...state,
                ...action.payload
            }
        case "AUTH_SET_CAPTCHA":
            return {
                ...state,
                isCaptcha: action.url
            }
        case "AUTH_SET_ERRORS":
            return {
                ...state,
                errorMessage: action.message
            }
        default:
            return state;
    }
}

export const getUserData = (): ThunkType<AuthActionsTypes | AppActionsTypes> => async (dispatch) => {
    try {
        let data = await authAPI.me();
        if (data.resultCode === ResultCodes.Success) {
            let {id, email, login} = data.data;
            let profile = await profileAPI.getProfile(id);
            let fullName = profile.fullName;
            let photo = profile.photos.small;
            dispatch(authActions.setUserData(id, email, login, fullName, photo, true));
        }
    } catch (error) {
        dispatch(appActions.setGlobalError(`Get auth data error: ${error.message}`));
        dispatch(appActions.setIsVisibleGlobalError(true));
    }
}

export const getCaptcha = (): ThunkType<AuthActionsTypes | AppActionsTypes> => async (dispatch) => {
    try {
        let url = await authAPI.getCaptcha();
        dispatch(authActions.setCaptcha(url));
    } catch (error) {
        dispatch(appActions.setGlobalError(`Get captcha error: ${error.message}`));
        dispatch(appActions.setIsVisibleGlobalError(true));
    }

}

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export const loginUser = (formData: LoginFormDataType): ThunkType<AuthActionsTypes | AppActionsTypes> => async (dispatch) => {
    try {
        let response = await authAPI.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
        dispatch(authActions.setLoginFormErrors(null));
        if (response.resultCode === ResultCodes.Success) {
            await dispatch(getUserData());
            dispatch(authActions.setCaptcha(null));
        } else {
            if (response.resultCode === ResultCodes.CaptchaIsRequired) {
                await dispatch(getCaptcha());
            }
            dispatch(authActions.setLoginFormErrors(response.messages[0]));
        }
    } catch (error) {
        dispatch(appActions.setGlobalError(`Login user error: ${error.message}`));
        dispatch(appActions.setIsVisibleGlobalError(true));
    }
}

export const logoutUser = (): ThunkType<AuthActionsTypes | AppActionsTypes> => async (dispatch) => {
    try {
        let data = await authAPI.logout();
        if (data.resultCode === ResultCodes.Success) {
            dispatch(authActions.setUserData(null, null, null, null, null, false));
            dispatch(authActions.setLoginFormErrors(null));
        }
        if (data.resultCode === ResultCodes.Error) {
            dispatch(authActions.setLoginFormErrors(data.messages[0]));
        }
    } catch (error) {
        dispatch(appActions.setGlobalError(`Logout user error: ${error.message}`));
        dispatch(appActions.setIsVisibleGlobalError(true));
    }
}

export default authReducer;