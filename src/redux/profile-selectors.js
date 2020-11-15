export const getProfile = (state) => {
    return state.profilePage.profile;
}

export const getStatus = (state) => {
    return state.profilePage.status;
}

export const getAuthUserId = (state) => {
    return state.auth.userId;
}

export const getProfileFormErrors = (state) => {
    return state.profilePage.errorMessage;
}

export const getIsSubmittingSuccess = (state) => {
    return state.profilePage.isSubmittingSuccess;
}

export const getPosts = (state) => {
    return state.profilePage.posts;
}