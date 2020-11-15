import {followAPI, usersAPI} from "../api/api";
import {setGlobalError, setIsVisibleGlobalError} from "./app-reduces";

const FOLLOW_UNFOLLOW = 'USERS_FOLLOW_UNFOLLOW';
const SET_USERS = 'USERS_SET_USERS';
const CLEAR_USERS = 'USERS_CLEAR_USERS';
const SET_CURRENT_PAGE = 'USERS_SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'USERS_SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'USERS_TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'USERS_TOGGLE_IS_FOLLOWING';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: action.action === 'following' ? true : action.action === 'unfollowing' ? false : null };
                    }
                    return user;
                })
            }
        case SET_USERS:
            let arrayId = state.users.map( item => item.id);
            return {
                ...state,
                users: [...state.users, ...action.users.filter((user) => !arrayId.includes(user.id)).reverse()],
            }
            case CLEAR_USERS:
            return {
                ...state,
                users: [],
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

export const followUnfollowSuccess = (userId, action) => ({type: FOLLOW_UNFOLLOW, userId, action})
export const setUsers = (users) => ({type: SET_USERS, users})
export const clearUsers = () => ({type: CLEAR_USERS})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowing = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING, isFetching, userId})

export const requestUsers = (page, pageSize) => async (dispatch) => {
    try {
        dispatch(setCurrentPage(page));
        dispatch(toggleIsFetching(true));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    } catch (error) {
        dispatch(setGlobalError(`Request users error: ${error.message}`));
        dispatch(setIsVisibleGlobalError(true));
    }
}

export const followUnfollow = (userId, action) => async (dispatch) => {
    try {
        dispatch(toggleFollowing(true, userId));
        let data = (action === 'following') ? await followAPI.followUser(userId) : (action === 'unfollowing') ? await followAPI.unfollowUser(userId) : null;

        if (data.resultCode === 0) {
            dispatch(followUnfollowSuccess(userId, action));
        }
        dispatch(toggleFollowing(false, userId));
    } catch (error) {
        dispatch(setGlobalError(`Follow or unfollow error: ${error.message}`));
        dispatch(setIsVisibleGlobalError(true));
    }
}

export default usersReducer;