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
import {profileType, userType} from "../../types/types";
import {appStateType} from "../../redux/redux-store";

type usersContainerType = {
    currentPage: number
    pageSize: number
    users: Array<userType>
    isAuth: boolean
    totalUsersCount: number
    followingInProgress: boolean
    isFetching: boolean

    requestUsers: (currentPage: number, pageSize: number) => void
    followUnfollow: (userId: number, action: string) => void
    setUserProfile: (profile: profileType | null) => void
    setUserStatus: (status: string | null) => void
}

const UsersContainer: React.FC<usersContainerType> = ({
                            requestUsers,
                            currentPage,
                            pageSize,
                            setUserProfile,
                            setUserStatus,
                            totalUsersCount,
                            users,
                            isAuth,
                            followingInProgress,
                            followUnfollow,
                            isFetching
                        }) => {

    useEffect(() => {
        requestUsers(currentPage, pageSize);
    }, [currentPage, requestUsers, pageSize])

    const onPageChanged = (pageNumber: number) => {
        requestUsers(pageNumber, pageSize);
    }

    const clearUserProfile = () => {
        setUserProfile(null);
        setUserStatus(null);
    }

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users 
                   pageSize={pageSize}
                   onPageChanged={onPageChanged}
                   currentPage={currentPage}
                   followingInProgress={followingInProgress}
                   followUnfollow={followUnfollow}
                   users={users}
                   clearUserProfile={clearUserProfile}
                   isAuth={isAuth}
            />
        </>
    );
}

const mapStateToProps = (state: appStateType) => {
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