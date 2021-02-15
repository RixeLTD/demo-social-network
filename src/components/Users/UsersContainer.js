import {connect} from 'react-redux';
import {requestUsers, followUnfollow} from '../../redux/users-reduces';
import {setUserProfile, setUserStatus} from "../../redux/profile-reducer";
import Users from './Users';
import React, {useEffect} from 'react';
import Preloader from "../common/preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";
import {getIsAuth} from "../../redux/auth-selectors";

const UsersContainer = ({requestUsers, currentPage, pageSize, setUserProfile, setUserStatus, totalUsersCount, users, isAuth, ...props}) => {

    useEffect(() => {
        requestUsers(currentPage, pageSize);
    }, [currentPage, requestUsers, pageSize])

    const onPageChanged = (pageNumber) => {
        requestUsers(pageNumber, pageSize);
    }

    const clearUserProfile = () => {
        setUserProfile(null);
        setUserStatus(null);
    }

    return (
        <>
            {props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={props.totalUsersCount}
                   pageSize={pageSize}
                   onPageChanged={onPageChanged}
                   currentPage={currentPage}
                   followingInProgress={props.followingInProgress}
                   followUnfollow={props.followUnfollow}
                   users={users}
                   clearUserProfile={clearUserProfile}
                   isAuth={isAuth}
            />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        users: getUsers(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state)
    }
}

const mapDispatchToProps = {
    requestUsers,
    followUnfollow,
    setUserProfile,
    setUserStatus,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(UsersContainer);