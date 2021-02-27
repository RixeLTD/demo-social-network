import {followAPI, ResultCodes, usersAPI} from "../api/api";
import {setGlobalError, setGlobalErrorType, setIsVisibleGlobalError, setIsVisibleGlobalErrorType} from "./app-reduces";
import {ThunkType, UserType} from "../types/types";

const FOLLOW_UNFOLLOW = 'USERS_FOLLOW_UNFOLLOW';
const SET_USERS = 'USERS_SET_USERS';
const SET_CURRENT_PAGE = 'USERS_SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'USERS_SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'USERS_TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'USERS_TOGGLE_IS_FOLLOWING';

type initialStateType = typeof initialState
const initialState = {
    users: [] as Array<UserType> | [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users id
};

type ActionsTypes = followUnfollowSuccessType| setUsersType  | setCurrentPageType | setTotalUsersCountType |
     toggleIsFetchingType | toggleFollowingType | setGlobalErrorType | setIsVisibleGlobalErrorType
const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case FOLLOW_UNFOLLOW:
            return {
                ...state,
                users: (state.users as Array<UserType>).map((user: UserType) => {
                    if (user.id === action.userId) {
                        return {
                            ...user,
                            followed: action.action === 'unfollowing' ? false : action.action === 'following' ?? true
                        };
                    }
                    return user;
                })
            }
        case SET_USERS:
            const arrayId: Array<number> = (state.users as Array<UserType>).map((item: UserType) => item.id);
            return {
                ...state,
                users: [...state.users, ...action.users.filter((user: UserType) => !arrayId.includes(user.id)).reverse()],
            }
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING:
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

type followUnfollowSuccessType = {type: typeof FOLLOW_UNFOLLOW, userId: number, action: "following" | "unfollowing"}
export const followUnfollowSuccess = (userId: number, action: "following" | "unfollowing"): followUnfollowSuccessType => ({type: FOLLOW_UNFOLLOW, userId, action})

export type setUsersType = {type: typeof SET_USERS, users: Array<UserType>}
export const setUsers = (users: Array<UserType>): setUsersType => ({type: SET_USERS, users})

export type setCurrentPageType = {type: typeof SET_CURRENT_PAGE, currentPage: number}
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage})

type setTotalUsersCountType = {type: typeof SET_TOTAL_USERS_COUNT, totalUsersCount: number}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})

export type toggleIsFetchingType = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})

type toggleFollowingType = {type: typeof TOGGLE_IS_FOLLOWING, isFetching: boolean, userId: number}
export const toggleFollowing = (isFetching: boolean, userId: number): toggleFollowingType => ({type: TOGGLE_IS_FOLLOWING, isFetching, userId})

export const requestUsers = (page: number, pageSize: number): ThunkType<ActionsTypes> => async (dispatch) => {
    try {
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetching(true));
        const data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    } catch (error) {
        dispatch(setGlobalError(`Request users error: ${error.message}`));
        dispatch(setIsVisibleGlobalError(true));
    }
}

export const followUnfollow = (userId: number, action: "following" | "unfollowing"): ThunkType<ActionsTypes> => async (dispatch) => {
    try {
        dispatch(toggleFollowing(true, userId));
        const data = (action === 'following') ? await followAPI.followUser(userId) : (action === 'unfollowing') ? await followAPI.unfollowUser(userId) : null;

        if (!data || data.resultCode === ResultCodes.Success) {
            dispatch(followUnfollowSuccess(userId, action));
        }
        dispatch(toggleFollowing(false, userId));
    } catch (error) {
        dispatch(setGlobalError(`Follow or unfollow error: ${error.message}`));
        dispatch(setIsVisibleGlobalError(true));
    }
}

export default usersReducer;