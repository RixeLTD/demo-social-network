import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getAuthUserId, getProfile, getStatus} from "../../redux/profile-selectors";

const ProfileContainer = ({match, authUserId, history, getUserProfile, getUserStatus, ...props}) => {

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

    return (
        <div>
            <Profile authUserId={authUserId} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus} />
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        status: getStatus(state),
        authUserId: getAuthUserId(state),
    }
}

let mapDispatchToProps = {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(ProfileContainer);