import {profileAPI} from "../api/api";
import {setGlobalError, setIsVisibleGlobalError} from "./app-reduces";

const ADD_POST = "PROFILE_ADD_POST";
const SET_USER_PROFILE = "PROFILE_SET_USER_PROFILE";
const SET_STATUS = "PROFILE_SET_STATUS";
const SET_USER_PHOTO = "PROFILE_SET_USER_PHOTO";
const SET_PROFILE_FORM_ERRORS = 'PROFILE_SET_PROFILE_FORM_ERRORS';
const SET_SUBMITTING_SUCCESS = 'PROFILE_SET_SUBMITTING_SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'How are you?', likesCount: 0},
        {id: 2, message: 'It\'s my first posts', likesCount: 26},
        {id: 3, message: 'yesssss', likesCount: 26},
        {id: 4, message: 'noooooo', likesCount: 26},
    ],
    profile: null,
    status: "",
    errorMessage: null,
    isSubmittingSuccess: false,
}

export const addPost = (postText) => ({type: ADD_POST, postText})

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile,})

export const setUserStatus = (status) => ({type: SET_STATUS, status,})

const setUserPhoto = (photos) => ({type: SET_USER_PHOTO, photos,})

const setProfileFormErrors = (message) => ({type: SET_PROFILE_FORM_ERRORS, message})

const setSubmittingSuccess = (value) => ({type: SET_SUBMITTING_SUCCESS, value})

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: state.posts.length + 1, message: action.postText, likesCount: 0}],
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
                profile: {...state.profile, photos: action.photos},
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

export const getUserProfile = (userId) => async (dispatch) => {
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

export const getUserStatus = (userId) => async (dispatch) => {
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

export const updateUserStatus = (status) => async (dispatch) => {
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

export const updateUserPhoto = (file) => async (dispatch) => {
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

export const updateProfile = (values) => async (dispatch) => {
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