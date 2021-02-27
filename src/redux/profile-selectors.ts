import {AppStateType} from "./redux-store";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile;
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status;
}

export const getAuthUserId = (state: AppStateType) => {
    return state.me.userId;
}

export const getProfileFormErrors = (state: AppStateType) => {
    return state.profilePage.errorMessage;
}

export const getIsSubmittingSuccess = (state: AppStateType) => {
    return state.profilePage.isSubmittingSuccess;
}

export const getPosts = (state: AppStateType) => {
    return state.profilePage.posts;
}