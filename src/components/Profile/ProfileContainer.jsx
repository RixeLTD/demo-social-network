import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    addPost,
    getUserProfile,
    getUserStatus, removePost,
    updateProfile,
    updateUserPhoto,
    updateUserStatus
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {
    getAuthUserId,
    getIsSubmittingSuccess, getPosts,
    getProfile,
    getProfileFormErrors,
    getStatus,
} from "../../redux/profile-selectors";
import Preloader from "../common/preloader/Preloader";

const ProfileContainer = ({match, authUserId, history,
                              getUserProfile, getUserStatus, profile,
                              errorMessage, isSubmittingSuccess, ...props}) => {

    useEffect( () => {
        let userId = Number(match.params.userId);
        if (!userId) {
            userId = authUserId;
            if (!userId) {
                history.push("/login/");
            }
        }
        getUserProfile(userId);
        getUserStatus(userId);
    }, [authUserId, match.params.userId, getUserProfile, getUserStatus, history])

    const onUpdateUserPhoto = (event) => {
        if (event.target.files) {
            props.updateUserPhoto(event.target.files[0]);
        }
    }

    const submitUpdateProfile = (values) => {
        props.updateProfile(values);
    }

    if (!profile) {
        return <Preloader/>
    }

    const ownProfile = authUserId === profile.userId;

    return (
        <>
            <Profile ownProfile={ownProfile}
                     profile={profile}
                     status={props.status}
                     updateUserStatus={props.updateUserStatus}
                     onUpdateUserPhoto={onUpdateUserPhoto}
                     submitUpdateProfile={submitUpdateProfile}
                     errorMessage={errorMessage}
                     isSubmittingSuccess={isSubmittingSuccess}
                     posts={props.posts}
                     addPost={props.addPost}
                     removePost={props.removePost}
                     />
        </>
    )
}

let mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        status: getStatus(state),
        authUserId: getAuthUserId(state),
        errorMessage: getProfileFormErrors(state),
        isSubmittingSuccess: getIsSubmittingSuccess(state),
        posts: getPosts(state),
    }
}

let mapDispatchToProps = {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    updateUserPhoto,
    updateProfile,
    addPost,
    removePost
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(ProfileContainer);