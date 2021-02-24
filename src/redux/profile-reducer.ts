import {profileAPI} from "../api/api";
import {setGlobalError, setIsVisibleGlobalError} from "./app-reduces";
import {postsType, profileType} from "../types/types";

const ADD_POST = "PROFILE_ADD_POST";
const REMOVE_POST = "PROFILE_REMOVE_POST";
const SET_USER_PROFILE = "PROFILE_SET_USER_PROFILE";
const SET_STATUS = "PROFILE_SET_STATUS";
const SET_USER_PHOTO = "PROFILE_SET_USER_PHOTO";
const SET_PROFILE_FORM_ERRORS = "PROFILE_SET_PROFILE_FORM_ERRORS";
const SET_SUBMITTING_SUCCESS = "PROFILE_SET_SUBMITTING_SUCCESS";

export type initialStateType = typeof initialState
const initialState = {
    posts: [
        {id: 1, message: "Вопросы, связанные с использованием lorem. Иные буквы встречаются с использованием lorem основе оригинального трактата благодаря", likesCount: 0},
        {id: 2, message: "Веб-дизайнерами для вставки на сайтах и смысловую нагрузку ему нести совсем необязательно", likesCount: 26},
        {id: 3, message: "Исключительно демонстрационная, то и демонстрации внешнего вида контента, просмотра шрифтов абзацев", likesCount: 20},
        {id: 4, message: "Он веб-дизайнерами для вставки на название. Трактата, благодаря чему появляется возможность получить более длинный неповторяющийся набор слов..", likesCount: 13},
    ] as Array<postsType>,
    profile: null as profileType | null,
    status: "",
    errorMessage: null as string | null,
    isSubmittingSuccess: false,
}

type addPostType = {type: typeof ADD_POST,postText: string}
export const addPost = (postText: string):addPostType => ({type: ADD_POST, postText})

type removePostType = {type: typeof REMOVE_POST, id: number}
export const removePost = (id: number):removePostType => ({type: REMOVE_POST, id})

type setUserProfileType = {type: typeof SET_USER_PROFILE, profile: profileType | null}
export const setUserProfile = (profile: profileType | null):setUserProfileType => ({type: SET_USER_PROFILE, profile})

type setUserStatusType = {type: typeof SET_STATUS, status: string}
export const setUserStatus = (status: string):setUserStatusType => ({type: SET_STATUS, status})

type setUserPhotoType = {type: typeof SET_USER_PHOTO, photos: string}
const setUserPhoto = (photos: string):setUserPhotoType => ({type: SET_USER_PHOTO, photos})

type setProfileFormErrorsType = {type: typeof SET_PROFILE_FORM_ERRORS, message: string | null}
const setProfileFormErrors = (message: string | null):setProfileFormErrorsType => ({type: SET_PROFILE_FORM_ERRORS, message})

type setSubmittingSuccessType = {type: typeof SET_SUBMITTING_SUCCESS, value: boolean}
const setSubmittingSuccess = (value: boolean):setSubmittingSuccessType => ({type: SET_SUBMITTING_SUCCESS, value})

const profileReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, message: action.postText, likesCount: 0}],
            };
        case REMOVE_POST:
            return {
                ...state,
                posts: [...state.posts.filter(u => u.id !== action.id)],
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            };
        case SET_USER_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as profileType,
            };
        case SET_PROFILE_FORM_ERRORS:
            return {
                ...state,
                errorMessage: action.message,
            }
        case SET_SUBMITTING_SUCCESS:
            return {
                ...state,
                isSubmittingSuccess: action.value,
            }
        default:
            return state;
    }
}

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    if (userId) {
        try {
            let data = await profileAPI.getProfile(userId);
            dispatch(setUserProfile(data));
        } catch (error) {
            dispatch(setGlobalError(`Get user profile error: ${error.message}`));
            dispatch(setIsVisibleGlobalError(true));
        }
    }
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
    if (userId) {
        try {
            let status = await profileAPI.getStatus(userId);
            dispatch(setUserStatus(status));
        } catch (error) {
            dispatch(setGlobalError(`Get user status error: ${error.message}`));
            dispatch(setIsVisibleGlobalError(true));
        }
    }
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    } catch (error) {
        dispatch(setGlobalError(`Update status error: ${error.message}`));
        dispatch(setIsVisibleGlobalError(true));
    }

}

export const updateUserPhoto = (file: any) => async (dispatch: any) => {
    if (file) {
        try {
            let data = await profileAPI.updatePhoto(file);
            if (data.resultCode === 0) {
                dispatch(setUserPhoto(data.data.photos));
            }
        } catch (error) {
            dispatch(setGlobalError(`Update user photo error: ${error.message}`));
            dispatch(setIsVisibleGlobalError(true));
        }
    }

}

export const updateProfile = (values: any) => async (dispatch: any) => {
    try {
        dispatch(setProfileFormErrors(null))
        let data = await profileAPI.updateProfile(values);
        if (data.resultCode === 0) {
            dispatch(setSubmittingSuccess(true));
            dispatch(getUserProfile(values.userId));
            dispatch(setSubmittingSuccess(false));
        } else {
            dispatch(setSubmittingSuccess(false));
            dispatch(setProfileFormErrors(data.messages[0]));
        }
    } catch (error) {
        dispatch(setGlobalError(`Update user profile error: ${error.message}`));
        dispatch(setIsVisibleGlobalError(true));
    }

}

export default profileReducer;