import React, {useEffect} from 'react'
import Profile from "./Profile"
import {connect, ConnectedProps} from "react-redux"
import {
    profileActions,
    getUserProfile,
    getUserStatus,
    updateProfile,
    updateUserPhoto,
    updateUserStatus
} from "../../redux/profile-reducer"
import {withRouter, RouteComponentProps} from "react-router-dom"
import {
    getAuthUserId,
    getIsSubmittingSuccess, getPosts,
    getProfile,
    getProfileFormErrors,
    getStatus
} from "../../redux/profile-selectors"
import Preloader from "../common/preloader/Preloader"
import {UpdateUserPhotoType} from "../../types/types"
import {AppStateType} from "../../redux/redux-store"

type RouterProps = { // type for `match.params`
    userId: string // must be type `string` since value comes from the URL
}
type OwnPropsType = RouteComponentProps<RouterProps>
type PropsType = PropsFromRedux & OwnPropsType
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
            userId = authUserId
            if (!userId) {
                history.push("/login/")
            }
        }
        if (userId && userId !== profile?.userId) {
            getUserProfile(userId)
            getUserStatus(userId)
        }
    }, [authUserId, match.params.userId, getUserProfile, getUserStatus, history, profile?.userId])

    const onUpdateUserPhoto = (event: UpdateUserPhotoType) => {
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

let mapState = (state: AppStateType) => {
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
    addPost: profileActions.addPost,
    removePost: profileActions.removePost
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
export default withRouter(connector(ProfileContainer))
