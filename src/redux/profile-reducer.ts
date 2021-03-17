import {profileAPI, ResultCodes, updateProfileType} from '../api/api'
import {appActions, AppActionsTypes} from './app-reduces'
import {PhotosType, PostsType, ProfileType, ThunkType} from '../types/types'
import {InferActionTypes} from './redux-store'

export type InitialStateType = typeof initialState
const initialState = {
    posts: [
        {
            id: 1,
            message: 'Вопросы, связанные с использованием lorem. Иные буквы встречаются с использованием lorem основе оригинального трактата благодаря',
            likesCount: 0
        },
        {
            id: 2,
            message: 'Веб-дизайнерами для вставки на сайтах и смысловую нагрузку ему нести совсем необязательно',
            likesCount: 26
        },
        {
            id: 3,
            message: 'Исключительно демонстрационная, то и демонстрации внешнего вида контента, просмотра шрифтов абзацев',
            likesCount: 20
        },
        {
            id: 4,
            message: 'Он веб-дизайнерами для вставки на название. Трактата, благодаря чему появляется возможность получить более длинный неповторяющийся набор слов..',
            likesCount: 13
        },
    ] as Array<PostsType>,
    counter: 4,
    profile: null as ProfileType | null,
    status: '',
    errorMessage: null as string | null,
    isSubmittingSuccess: false,
    isFetching: false
}

export type ProfileActionsTypes = InferActionTypes<typeof profileActions>
export const profileActions = {
    addPost: (postText: string) => ({type: 'PROFILE_ADD_POST', postText} as const),
    removePost: (id: number) => ({type: 'PROFILE_REMOVE_POST', id} as const),
    setUserProfile: (profile: ProfileType | null) => ({type: 'PROFILE_SET_USER_PROFILE', profile} as const),
    setUserStatus: (status: string) => ({type: 'PROFILE_SET_STATUS', status} as const),
    setUserPhoto: (photos: PhotosType) => ({type: 'PROFILE_SET_USER_PHOTO', photos} as const),
    setProfileFormErrors: (message: string | null) => ({
        type: 'PROFILE_SET_PROFILE_FORM_ERRORS',
        message
    } as const),
    setSubmittingSuccess: (value: boolean) => ({type: 'PROFILE_SET_SUBMITTING_SUCCESS', value} as const),
    setIsFetching: (value: boolean) => ({type: 'PROFILE_SET_IS_FETCHING', value} as const),
}

const profileReducer = (state = initialState, action: ProfileActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'PROFILE_ADD_POST':
            return {
                ...state,
                posts: [...state.posts, {id: state.counter + 1, message: action.postText, likesCount: 0}],
                counter: state.counter + 1,
            }
        case 'PROFILE_REMOVE_POST':
            return {
                ...state,
                posts: [...state.posts.filter(u => u.id !== action.id)],
            }
        case 'PROFILE_SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile,
            }
        case 'PROFILE_SET_STATUS':
            return {
                ...state,
                status: action.status,
            }
        case 'PROFILE_SET_USER_PHOTO':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType,
            }
        case 'PROFILE_SET_PROFILE_FORM_ERRORS':
            return {
                ...state,
                errorMessage: action.message,
            }
        case 'PROFILE_SET_SUBMITTING_SUCCESS':
            return {
                ...state,
                isSubmittingSuccess: action.value,
            }
        case 'PROFILE_SET_IS_FETCHING':
            return {
                ...state,
                isFetching: action.value,
            }
        default:
            return state
    }
}

export const getUserProfile = (userId: number): ThunkType<ProfileActionsTypes | AppActionsTypes> => async (dispatch) => {
    if (userId) {
        try {
            dispatch(profileActions.setIsFetching(true))
            const data = await profileAPI.getProfile(userId)
            dispatch(profileActions.setUserProfile(data))
            dispatch(profileActions.setIsFetching(false))
        } catch (error) {
            dispatch(appActions.setGlobalError(`Get user profile error: ${error.message}`))
            dispatch(appActions.setIsVisibleGlobalError(true))
        }
    }
}

export const getUserStatus = (userId: number): ThunkType<ProfileActionsTypes | AppActionsTypes> => async (dispatch) => {
    if (userId) {
        try {
            const status = await profileAPI.getStatus(userId)
            dispatch(profileActions.setUserStatus(status))
        } catch (error) {
            dispatch(appActions.setGlobalError(`Get user status error: ${error.message}`))
            dispatch(appActions.setIsVisibleGlobalError(true))
        }
    }
}

export const updateUserStatus = (status: string): ThunkType<ProfileActionsTypes | AppActionsTypes> => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.resultCode === ResultCodes.Success) {
            dispatch(profileActions.setUserStatus(status))
        }
    } catch (error) {
        dispatch(appActions.setGlobalError(`Update status error: ${error.message}`))
        dispatch(appActions.setIsVisibleGlobalError(true))
    }
}

export const updateProfile = (values: updateProfileType): ThunkType<ProfileActionsTypes | AppActionsTypes> => async (dispatch) => {
    try {
        dispatch(profileActions.setProfileFormErrors(null))
        let data = await profileAPI.updateProfile(values)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(profileActions.setSubmittingSuccess(true))
            await dispatch(getUserProfile(values.userId))
            dispatch(profileActions.setSubmittingSuccess(false))
        } else {
            dispatch(profileActions.setSubmittingSuccess(false))
            dispatch(profileActions.setProfileFormErrors(data.messages[0]))
        }
    } catch (error) {
        dispatch(appActions.setGlobalError(`Update user profile error: ${error.message}`))
        dispatch(appActions.setIsVisibleGlobalError(true))
    }
}

export default profileReducer