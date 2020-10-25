import {connect} from 'react-redux';
import {requestUsers, followUnfollow} from '../../redux/users-reduces';
import Users from './Users';
import React, {useEffect} from 'react';
import Preloader from "../common/preloader/preloader";
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
                   users={props.users}
                   currentPage={currentPage}
                   followingInProgress={props.followingInProgress}
                   followUnfollow={props.followUnfollow}
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
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(UsersContainer);