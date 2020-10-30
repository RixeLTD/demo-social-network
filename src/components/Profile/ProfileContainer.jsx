import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserStatus,
    updateProfile,
    updateUserPhoto,
    updateUserStatus
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {
    getAuthUserId,
    getIsSubmittingSuccess,
    getProfile,
    getProfileFormErrors,
    getStatus
} from "../../redux/profile-selectors";
import Preloader from "../common/preloader/preloader";

const ProfileContainer = ({match, authUserId, history,
                              getUserProfile, getUserStatus, profile,
                              errorMessage, isSubmittingSuccess, ...props}) => {

    const onUpdateUserPhoto = (event) => {
        if (event.target.files) {
            props.updateUserPhoto(event.target.files[0]);
        }
    }

    const submitUpdateProfile = (values) => {
        props.updateProfile(values);
    }

    useEffect( () => {
        let userId = match.params.userId;
        if (!userId) {
            userId = authUserId;
            if (!userId) {
                history.push("/login/")
            }
        }
        getUserProfile(userId);
        getUserStatus(userId);
    }, [authUserId, match.params.userId, getUserProfile, getUserStatus, history])


    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <Profile authUserId={authUserId}
                     profile={profile}
                     status={props.status}
                     updateUserStatus={props.updateUserStatus}
                     onUpdateUserPhoto={onUpdateUserPhoto}
                     submitUpdateProfile={submitUpdateProfile}
                     errorMessage={errorMessage}
                     isSubmittingSuccess={isSubmittingSuccess}/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        status: getStatus(state),
        authUserId: getAuthUserId(state),
        errorMessage: getProfileFormErrors(state),
        isSubmittingSuccess: getIsSubmittingSuccess(state),
    }
}

let mapDispatchToProps = {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    updateUserPhoto,
    updateProfile,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(ProfileContainer);