import {authAPI, profileAPI, ResultCodes} from "../api/api"
import {setGlobalError, setGlobalErrorType, setIsVisibleGlobalError, setIsVisibleGlobalErrorType} from "./app-reduces"
import {ThunkType} from "../types/types";

const SET_USER_DATA = 'AUTH_SET_USER_DATA'
const SET_CAPTCHA = 'AUTH_SET_CAPTCHA'
const SET_ERRORS = 'AUTH_SET_ERRORS'

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

export type initialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
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

type ActionsTypes = setUserDataType | setCaptchaType | setLoginFormErrorsType | setGlobalErrorType | setIsVisibleGlobalErrorType

type setUserDataType = {
    type: typeof SET_USER_DATA
    payload: setUserDataPayloadType
}
type setUserDataPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    fullName: string | null
    photo: string | null
    isAuth: boolean
}
const setUserData = (userId: number | null, email: string | null, login: string | null, fullName: string | null, photo: string | null, isAuth: boolean): setUserDataType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, fullName, photo, isAuth}
})

type setCaptchaType = {
    type: typeof SET_CAPTCHA
    isCaptcha: string | null
}
const setCaptcha = (url: string | null):setCaptchaType => ({
    type: SET_CAPTCHA,
    isCaptcha: url
})

type setLoginFormErrorsType = {
    type: typeof SET_ERRORS
    message: string | null
}
const setLoginFormErrors = (message: string | null): setLoginFormErrorsType => ({
    type: SET_ERRORS,
    message
})

export const getUserData = (): ThunkType<ActionsTypes> => async (dispatch) => {
    try {
        let data = await authAPI.me();
        if (data.resultCode === ResultCodes.Success) {
            let {id, email, login} = data.data;
            let profile = await profileAPI.getProfile(id);
            let fullName = profile.fullName;
            let photo = profile.photos.small;
            dispatch(setUserData(id, email, login, fullName, photo, true));
        }
    } catch (error) {
        dispatch(setGlobalError(`Get auth data error: ${error.message}`));
        dispatch(setIsVisibleGlobalError(true));
    }
}

export const getCaptcha = (): ThunkType<ActionsTypes> => async (dispatch) => {
    try {
        let url = await authAPI.getCaptcha();
        dispatch(setCaptcha(url));
    } catch (error) {
        dispatch(setGlobalError(`Get captcha error: ${error.message}`));
        dispatch(setIsVisibleGlobalError(true));
    }

}

export type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export const loginUser = (formData: LoginFormDataType): ThunkType<ActionsTypes> => async (dispatch) => {
    try {
        let response = await authAPI.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
        dispatch(setLoginFormErrors(null));
        if (response.resultCode === ResultCodes.Success) {
            await dispatch(getUserData());
            dispatch(setCaptcha(null));
        } else {
            if (response.resultCode === ResultCodes.CaptchaIsRequired) {
                dispatch(getCaptcha());
            }
            dispatch(setLoginFormErrors(response.messages[0]));
        }
    } catch (error) {
        dispatch(setGlobalError(`Login user error: ${error.message}`));
        dispatch(setIsVisibleGlobalError(true));
    }
}

export const logoutUser = (): ThunkType<ActionsTypes> => async (dispatch) => {
    try {
        let data = await authAPI.logout();
        if (data.resultCode === ResultCodes.Success) {
            dispatch(setUserData(null, null, null, null, null, false));
            dispatch(setLoginFormErrors(null));
        }
        if (data.resultCode === ResultCodes.Error) {
            dispatch(setLoginFormErrors(data.messages[0]));
        }
    } catch (error) {
        dispatch(setGlobalError(`Logout user error: ${error.message}`));
        dispatch(setIsVisibleGlobalError(true));
    }
}

export default authReducer;