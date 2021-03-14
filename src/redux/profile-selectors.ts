import {AppStateType} from "./redux-store";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile;
}

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status;
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

export const selectIsFetching = (state: AppStateType) => {
    return state.profilePage.isFetching;
}