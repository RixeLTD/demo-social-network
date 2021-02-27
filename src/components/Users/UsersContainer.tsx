import {connect} from 'react-redux'
import {requestUsers, followUnfollow} from '../../redux/users-reduces'
import {setUserProfile, setUserStatus} from "../../redux/profile-reducer"
import Users from './Users'
import React from 'react'
import Preloader from "../common/preloader/Preloader"
import {compose} from "redux"
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getUsers
} from "../../redux/users-selectors"
import {getIsAuth} from "../../redux/auth-selectors"
import {ProfileType, UserType} from "../../types/types"
import {AppStateType} from "../../redux/redux-store"

type UsersContainerType = {
    currentPage: number
    pageSize: number
    users: Array<UserType>
    isAuth: boolean
    followingInProgress: Array<number>
    isFetching: boolean

    requestUsers: (currentPage: number, pageSize: number) => void
    followUnfollow: (userId: number, action: "following" | "unfollowing") => void
    setUserProfile: (profile: ProfileType | null) => void
    setUserStatus: (status: string) => void
}

const UsersContainer: React.FC<UsersContainerType> = ({
                            requestUsers,
                            currentPage,
                            pageSize,
                            setUserProfile,
                            setUserStatus,
                            users,
                            isAuth,
                            followingInProgress,
                            followUnfollow,
                            isFetching
                        }) => {

    const onPageChanged = (pageNumber: number) => {
        requestUsers(pageNumber, pageSize)
    }

    const clearUserProfile = () => {
        setUserProfile(null)
        setUserStatus("")
    }

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users 
                   onPageChanged={onPageChanged}
                   currentPage={currentPage}
                   followingInProgress={followingInProgress}
                   followUnfollow={followUnfollow}
                   users={users}
                   clearUserProfile={clearUserProfile}
                   isAuth={isAuth}
            />
        </>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
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
)(UsersContainer)