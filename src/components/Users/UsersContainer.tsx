import {connect, ConnectedProps} from 'react-redux'
import {requestUsers, followUnfollow, requestSearchUsers} from '../../redux/users-reduces'
import Users from './Users'
import React from 'react'
import Preloader from "../common/preloader/Preloader"
import {
    getCurrentPage, getCurrentSearchPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getSearchUsers, getTotalSearchUsersCount, getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors"
import {getIsAuth} from "../../redux/auth-selectors"
import {AppStateType} from "../../redux/redux-store"

const UsersContainer: React.FC<PropsFromRedux> = ({
                                                      requestUsers,
                                                      currentPage,
                                                      users,
                                                      searchUsers,
                                                      isAuth,
                                                      followingInProgress,
                                                      followUnfollow,
                                                      isFetching,
                                                      requestSearchUsers,
                                                      currentSearchPage,
                                                      totalUsersCount,
                                                      totalSearchUsersCount,
                                                  }) => {

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users
                requestUsers={requestUsers}
                currentPage={currentPage}
                currentSearchPage={currentSearchPage}
                followingInProgress={followingInProgress}
                followUnfollow={followUnfollow}
                users={users}
                searchUsers={searchUsers}
                isAuth={isAuth}
                requestSearchUsers={requestSearchUsers}
                totalUsersCount={totalUsersCount}
                totalSearchUsersCount={totalSearchUsersCount}
            />
        </>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        pageSize: getPageSize(state),
        users: getUsers(state),
        searchUsers: getSearchUsers(state),
        currentPage: getCurrentPage(state),
        currentSearchPage: getCurrentSearchPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state),
        totalUsersCount: getTotalUsersCount(state),
        totalSearchUsersCount: getTotalSearchUsersCount(state)
    }
}

const mapDispatchToProps = {
    requestUsers,
    requestSearchUsers,
    followUnfollow
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(UsersContainer)