import {appStateType} from "./redux-store";

export const getProfile = (state: appStateType) => {
    return state.profilePage.profile;
}

export const getStatus = (state: appStateType) => {
    return state.profilePage.status;
}

export const getAuthUserId = (state: appStateType) => {
    return state.auth.userId;
}

export const getProfileFormErrors = (state: appStateType) => {
    return state.profilePage.errorMessage;
}

export const getIsSubmittingSuccess = (state: appStateType) => {
    return state.profilePage.isSubmittingSuccess;
}

export const getPosts = (state: appStateType) => {
    return state.profilePage.posts;
}