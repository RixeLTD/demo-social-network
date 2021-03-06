import {ResultCodes, usersAPI} from '../api/api'
import {ThunkType, UserType} from "../types/types";
import {InferActionTypes} from "./redux-store";
import {appActions, AppActionsTypes} from "./app-reduces";

export type InitialStateType = typeof initialState
const initialState = {
    users: [] as Array<UserType> | [],
    searchUsers: [] as Array<UserType> | [],
    pageSize: 10,
    totalUsersCount: 0,
    totalSearchUsersCount: 0,
    currentPage: 1,
    currentSearchPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users id
}

export type UsersActionsTypes = InferActionTypes<typeof usersActions>

export const usersActions = {
    followUnfollowSuccess: (userId: number, action: "following" | "unfollowing") => ({type: "USERS_FOLLOW_UNFOLLOW", userId, action} as const),
    setUsers: (users: Array<UserType>) => ({type: "USERS_SET_USERS", users} as const),
    setSearchUsers: (searchUsers: Array<UserType>) => ({type: "USERS_SET_SEARCH_USERS", searchUsers} as const),
    setCurrentPage: (currentPage: number) => ({type: "USERS_SET_CURRENT_PAGE", currentPage} as const),
    setCurrentSearchPage: (currentSearchPage: number) => ({type: "USERS_SET_CURRENT_SEARCH_PAGE", currentSearchPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: "USERS_SET_TOTAL_USERS_COUNT", totalUsersCount} as const),
    setTotalSearchUsersCount: (totalSearchUsersCount: number) => ({type: "USERS_SET_TOTAL_SEARCH_USERS_COUNT", totalSearchUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: "USERS_TOGGLE_IS_FETCHING", isFetching} as const),
    toggleFollowing: (isFetching: boolean, userId: number) => ({type: "USERS_TOGGLE_IS_FOLLOWING", isFetching, userId} as const),
}

const usersReducer = (state = initialState, action: UsersActionsTypes | AppActionsTypes): InitialStateType => {
    switch (action.type) {
        case "USERS_FOLLOW_UNFOLLOW":
            return {
                ...state,
                users: (state.users as Array<UserType>).map((user: UserType) => {
                    if (user.id === action.userId) {
                        return {
                            ...user,
                            followed: action.action === "unfollowing" ? false : action.action === "following" ?? true
                        };
                    }
                    return user;
                }),
                searchUsers: (state.searchUsers as Array<UserType>).map((user: UserType) => {
                    if (user.id === action.userId) {
                        return {
                            ...user,
                            followed: action.action === "unfollowing" ? false : action.action === "following" ?? true
                        };
                    }
                    return user;
                })
            }
        case "USERS_SET_USERS":
            const arrayId: Array<number> = (state.users as Array<UserType>).map((item: UserType) => item.id);
            return {
                ...state,
                users: [...state.users, ...action.users.filter((user: UserType) => !arrayId.includes(user.id)).reverse()],
            }
        case "USERS_SET_SEARCH_USERS":
            return {
                ...state,
                searchUsers: [...action.searchUsers]
            }
        case "USERS_SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "USERS_SET_CURRENT_SEARCH_PAGE":
            return {...state, currentSearchPage: action.currentSearchPage}
        case "USERS_SET_TOTAL_USERS_COUNT":
            return {...state, totalUsersCount: action.totalUsersCount}
        case "USERS_SET_TOTAL_SEARCH_USERS_COUNT":
            return {...state, totalUsersCount: action.totalSearchUsersCount}
        case "USERS_TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "USERS_TOGGLE_IS_FOLLOWING":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export const requestUsers = (page: number, pageSize: number): ThunkType<UsersActionsTypes | AppActionsTypes> => async (dispatch) => {
    try {
        dispatch(usersActions.setCurrentPage(page));
        dispatch(usersActions.toggleIsFetching(true));
        const data = await usersAPI.getUsers(page, pageSize);
        dispatch(usersActions.toggleIsFetching(false));
        dispatch(usersActions.setUsers(data.items));
        dispatch(usersActions.setTotalUsersCount(data.totalCount));
    } catch (error) {
        dispatch(appActions.setGlobalError(`Request users error: ${error.message}`));
        dispatch(appActions.setIsVisibleGlobalError(true));
    }
}

export const requestSearchUsers = (currentSearchPage: number,
                                   pageSize: number,
                                   term: string,
                                   friend: boolean | null): ThunkType<UsersActionsTypes | AppActionsTypes> => async (dispatch) => {
    try {
        dispatch(usersActions.setCurrentSearchPage(currentSearchPage))
        dispatch(usersActions.toggleIsFetching(true))
        const data = await usersAPI.getUsers(currentSearchPage, pageSize, term, friend)
        dispatch(usersActions.toggleIsFetching(false))
        dispatch(usersActions.setSearchUsers(data.items))
    } catch (error) {
        dispatch(appActions.setGlobalError(`Request users error: ${error.message}`))
        dispatch(appActions.setIsVisibleGlobalError(true))
    }
}

export const followUnfollow = (userId: number, action: "following" | "unfollowing"): ThunkType<UsersActionsTypes | AppActionsTypes> => async (dispatch) => {
    try {
        dispatch(usersActions.toggleFollowing(true, userId));
        const data = (action === "following") ? await usersAPI.followUser(userId) : (action === "unfollowing") ? await usersAPI.unfollowUser(userId) : null;

        if (data && data.resultCode === ResultCodes.Success) {
            dispatch(usersActions.followUnfollowSuccess(userId, action));
        }
        dispatch(usersActions.toggleFollowing(false, userId));
    } catch (error) {
        dispatch(appActions.setGlobalError(`Follow or unfollow error: ${error.message}`));
        dispatch(appActions.setIsVisibleGlobalError(true));
    }
}

export default usersReducer;