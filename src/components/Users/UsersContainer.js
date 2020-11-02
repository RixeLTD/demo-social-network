import {connect} from 'react-redux';
import {requestUsers, followUnfollow, clearUserProfile} from '../../redux/users-reduces';
import Users from './Users';
import React, {useEffect} from 'react';
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";

const UsersContainer = ({requestUsers, currentPage, pageSize, ...props}) => {

    useEffect(() => {
        requestUsers(currentPage, pageSize);
    }, [currentPage, requestUsers, pageSize])

    const onPageChanged = (pageNumber) => {
        requestUsers(pageNumber, pageSize);
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
                   users={props.users}
                   clearUserProfile={props.clearUserProfile}
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
    }
}

const mapDispatchToProps = {
    requestUsers,
    followUnfollow,
    clearUserProfile,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(UsersContainer);