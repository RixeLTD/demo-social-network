import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux/redux-store";
import {Action} from "redux";
import React from "react";

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string | null
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type UserType = {
    name: string
    id: number
    photos: PhotosType
    status: string | null
    followed: boolean
}

export type ThunkType<AC extends Action, returnType = void> = ThunkAction<Promise<returnType>, AppStateType, unknown, AC>

export type UpdateUserPhotoType = React.ChangeEvent<HTMLInputElement>