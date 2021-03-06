import axios from "axios";
import {PhotosType, ProfileType, UserType} from '../types/types'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'api-key': '626768c7-3dde-4a67-8816-4d99ae8d7ed2',
    },
})

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type GetUsers = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10, term: string | null = "", friend: boolean | null = null) {
        let response = await instance.get<GetUsers>(`users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${friend}`);
        return response.data;
    },
    unfollowUser(userId: number) {
        return instance.delete<ResponseDataType>('follow/' + userId).then(response => response.data);
    },
    followUser(userId: number) {
        return instance.post<ResponseDataType>('follow/' + userId).then(response => response.data);
    }
}

export type ResponseDataType = {
    resultCode: ResultCodes
    messages: Array<string>,
    data: {}
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId).then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(response => response.data);
    },
    updateStatus(status: string) {
        return instance.put<ResponseDataType>('profile/status', {status: status}).then(response => response.data);
    },
    updatePhoto(file: string | Blob) {
        const formData = new FormData();
        formData.append("image", file);
        return instance.put<ResponseDataType & {data: {photos: PhotosType}}>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    updateProfile(values: ProfileType) {
        return instance.put<ResponseDataType>('profile', values).then(response => response.data);
    }
}

export type AuthMeType = {
    data: {
        id: number
        email: string
        login: string
    }
}
export type AuthLoginType = {
    data: {
        userId: number
    }
}
export const authAPI = {
    me() {
        return instance.get<ResponseDataType & AuthMeType>(`auth/me`).then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ResponseDataType & AuthLoginType>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseDataType>('auth/login').then(response => response.data);
    },
    getCaptcha() {
        return instance.get<{url: string}>('security/get-captcha-url').then(response => response.data.url);
    }
}

