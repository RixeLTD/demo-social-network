import {getUserData} from "./auth-reduces"
import {clearUsers, setCurrentPage} from "./users-reduces"
import {usersAPI} from "../api/api"

const INITIALIZED_SUCCESS = 'APP_INITIALIZED_SUCCESS'
const SET_GLOBAL_ERROR = 'APP_SET_GLOBAL_ERROR'
const IS_GLOBAL_ERROR = 'APP_IS_GLOBAL_ERROR'

export type initialStateType = typeof initialState

let initialState = {
    initialized: false,
    globalError: null as string | null,
    isVisibleGlobalError: false
}

type initializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): initializedSuccessType => ({
    type: INITIALIZED_SUCCESS,
})

type setGlobalErrorType = {
    type: typeof SET_GLOBAL_ERROR
    error: string
}
export const setGlobalError = (error: string): setGlobalErrorType => ({
    type: SET_GLOBAL_ERROR, error
})

type setIsVisibleGlobalErrorType = {
    type: typeof IS_GLOBAL_ERROR
    value: boolean
}
export const setIsVisibleGlobalError = (value: boolean): setIsVisibleGlobalErrorType => ({
    type: IS_GLOBAL_ERROR, value
})

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        case SET_GLOBAL_ERROR:
            return {
                ...state,
                globalError: action.error,
            }
        case IS_GLOBAL_ERROR:
            return {
                ...state,
                isVisibleGlobalError: action.value,
            }
        default:
            return state;
    }
}

export const initializeApp = () => async (dispatch: any) => {
    await dispatch(getUserData());
    try {
        let data = await usersAPI.getUsers(1, 10);
        let newCurrentPage = data["totalCount"] % 10 === 0 ? data["totalCount"] / 10 : Math.floor(data["totalCount"] / 10) + 1;
        dispatch(setCurrentPage(newCurrentPage));
        dispatch(clearUsers());
        dispatch(initializedSuccess());
    } catch (error) {
        dispatch(setGlobalError(`initializeApp error: ${error.message}`));
        dispatch(setIsVisibleGlobalError(true));
    }
}

export default appReducer;