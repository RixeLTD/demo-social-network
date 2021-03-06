import {getUserData} from "./auth-reduces"
import {usersAPI} from "../api/api"
import {ThunkType} from "../types/types";
import {InferActionTypes} from "./redux-store";
import {usersActions, UsersActionsTypes} from "./users-reduces";

export type InitialStateType = typeof initialState

let initialState = {
    initialized: false,
    globalError: null as string | null,
    isVisibleGlobalError: false
}

export type AppActionsTypes = InferActionTypes<typeof appActions>

export const appActions = {
    initializedSuccess: () => ({
        type: "APP_INITIALIZED_SUCCESS",
    } as const),
    setGlobalError: (error: string | null) => ({
        type: "APP_SET_GLOBAL_ERROR", error
    } as const),
    setIsVisibleGlobalError: (value: boolean) => ({
        type: "APP_IS_GLOBAL_ERROR", value
    } as const)
}

const appReducer = (state = initialState, action: AppActionsTypes): InitialStateType => {
    switch (action.type) {
        case "APP_INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            }
        case "APP_SET_GLOBAL_ERROR":
            return {
                ...state,
                globalError: action.error,
            }
        case "APP_IS_GLOBAL_ERROR":
            return {
                ...state,
                isVisibleGlobalError: action.value,
            }
        default:
            return state;
    }
}

export const initializeApp = (): ThunkType<AppActionsTypes | UsersActionsTypes> => async (dispatch) => {

    await dispatch(getUserData());
    try {
        dispatch(usersActions.toggleIsFetching(true));
        let data = await usersAPI.getUsers();
        const newCurrentPage = data["totalCount"] % 10 === 0 ? data["totalCount"] / 10 : Math.floor(data["totalCount"] / 10) + 1;
        data = await usersAPI.getUsers(newCurrentPage)
        dispatch(usersActions.setUsers(data.items))
        dispatch(usersActions.setCurrentPage(newCurrentPage - 1));
        data = await usersAPI.getUsers(newCurrentPage - 1)
        dispatch(usersActions.toggleIsFetching(false));
        dispatch(usersActions.setUsers(data.items))
        dispatch(appActions.initializedSuccess());
    } catch (error) {
        dispatch(appActions.setGlobalError(`initializeApp error: ${error.message}`));
        dispatch(appActions.setIsVisibleGlobalError(true));
    }
}

export default appReducer;