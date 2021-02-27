import React, {useEffect} from 'react'
import Profile from "./Profile"
import {connect} from "react-redux"
import {
    addPost,
    getUserProfile,
    getUserStatus, removePost,
    updateProfile,
    updateUserPhoto,
    updateUserStatus
} from "../../redux/profile-reducer"
import {withRouter, RouteComponentProps} from "react-router-dom"
import {compose} from "redux"
import {
    getAuthUserId,
    getIsSubmittingSuccess, getPosts,
    getProfile,
    getProfileFormErrors,
    getStatus
} from "../../redux/profile-selectors"
import Preloader from "../common/preloader/Preloader"
import {PostsType, ProfileType, UpdateUserPhotoType} from "../../types/types"
import {AppStateType} from "../../redux/redux-store"

type RouterProps = { // type for `match.params`
    userId: string // must be type `string` since value comes from the URL
}
type MapStateType = {
    authUserId: number | null
    profile: ProfileType | null
    errorMessage: string | null
    isSubmittingSuccess: boolean
    status: string
    posts: Array<PostsType>
}
type MapDispatchType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserPhoto: (file: string | Blob) => void
    updateProfile: (values: ProfileType) => void
    updateUserStatus: (value: string) => void
    addPost: (postText: string) => void
    removePost: (id: number) => void
}
type OwnPropsType = RouteComponentProps<RouterProps>
type PropsType = MapStateType & MapDispatchType & OwnPropsType

const ProfileContainer: React.FC<PropsType> = ({
                                                   match,
                                                   authUserId,
                                                   history,
                                                   getUserProfile,
                                                   getUserStatus,
                                                   profile,
                                                   errorMessage,
                                                   isSubmittingSuccess,
                                                   updateUserPhoto,
                                                   updateProfile,
                                                   updateUserStatus,
                                                   status,
                                                   posts,
                                                   addPost,
                                                   removePost
                                               }) => {

    useEffect(() => {
        let userId: number | null = +match.params.userId
        if (!userId) {
            userId = authUserId;
            if (!userId) {
                history.push("/login/")
            }
        }
        if (userId) {
            getUserProfile(userId)
            getUserStatus(userId)
        }
    }, [authUserId, match.params.userId, getUserProfile, getUserStatus, history])

    const onUpdateUserPhoto = (event: UpdateUserPhotoType) => {
        console.log(event)
        if (event.target.files) {
            updateUserPhoto(event.target.files[0])
        }
    }

    if (!profile) {
        return <Preloader/>
    }

    const ownProfile: boolean = authUserId === profile.userId

    return (
        <>
            <Profile ownProfile={ownProfile}
                     profile={profile}
                     status={status}
                     updateUserStatus={updateUserStatus}
                     onUpdateUserPhoto={onUpdateUserPhoto}
                     updateProfile={updateProfile}
                     errorMessage={errorMessage}
                     isSubmittingSuccess={isSubmittingSuccess}
                     posts={posts}
                     addPost={addPost}
                     removePost={removePost}
            />
        </>
    )
}

let mapState = (state: AppStateType): MapStateType => {
    return {
        profile: getProfile(state),
        status: getStatus(state),
        authUserId: getAuthUserId(state),
        errorMessage: getProfileFormErrors(state),
        isSubmittingSuccess: getIsSubmittingSuccess(state),
        posts: getPosts(state),
    }
}

let mapDispatch = {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    updateUserPhoto,
    updateProfile,
    addPost,
    removePost
}

export default compose(
    connect<MapStateType, MapDispatchType, OwnPropsType, AppStateType>(mapState, mapDispatch),
    withRouter,
)(ProfileContainer)