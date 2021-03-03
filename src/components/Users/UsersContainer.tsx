import {connect, ConnectedProps} from 'react-redux'
import {requestUsers, followUnfollow} from '../../redux/users-reduces'
import {profileActions} from "../../redux/profile-reducer"
import Users from './Users'
import React from 'react'
import Preloader from "../common/preloader/Preloader"
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getUsers
} from "../../redux/users-selectors"
import {getIsAuth} from "../../redux/auth-selectors"
import {AppStateType} from "../../redux/redux-store"

const UsersContainer: React.FC<PropsFromRedux> = ({
                            requestUsers,
                            currentPage,
                            pageSize,
                            users,
                            isAuth,
                            followingInProgress,
                            followUnfollow,
                            isFetching
                        }) => {

    const onPageChanged = (pageNumber: number) => {
        requestUsers(pageNumber, pageSize)
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
    followUnfollow
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(UsersContainer)