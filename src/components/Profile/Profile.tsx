import React, {useEffect, useState} from 'react'
import MyPosts from "./MyPosts/MyPosts"
import s from './Profile.module.scss'
import noImage from "../../assets/images/noImage.png"
import ProfileBlockForm from "./ProfileBlock/ProfileBlockForm"
import ProfileBlock from "./ProfileBlock/ProfileBlock"
import {PostsType, ProfileType, UpdateUserPhotoType} from "../../types/types";

type ProfileComponentType = {
    ownProfile: boolean
    errorMessage: string | null
    profile: ProfileType
    status: string
    isSubmittingSuccess: boolean
    posts: Array<PostsType>

    onUpdateUserPhoto: (event: UpdateUserPhotoType) => void
    updateProfile: (value: ProfileType) => void
    updateUserStatus: (value: string) => void
    addPost: (postText: string) => void
    removePost: (id: number) => void
}

const Profile: React.FC<ProfileComponentType> = ({
                                  ownProfile,
                                  errorMessage,
                                  profile,
                                  onUpdateUserPhoto,
                                  updateProfile,
                                  isSubmittingSuccess,
                                  status,
                                  updateUserStatus,
                                  posts,
                                  addPost,
                                  removePost
                              }) => {
    let [editMode, setEditMode] = useState(false);
    let [localErrorMessage, setLocalErrorMessage] = useState(errorMessage)

    useEffect(() => {
        setLocalErrorMessage(errorMessage)
    }, [errorMessage])

    const enableEditMode = () => {
        setLocalErrorMessage(null)
        setEditMode(true)
    }

    const disableEditMode = () => {
        setEditMode(false)
    }
    return (
        <div className={s.profileBlock}>
            <div className={s.profileImageContainer}>
                <div className={s.profileImageBlock}>
                    <img className={s.userImage} src={profile.photos.large || noImage}
                         alt=""/>
                    {ownProfile
                        ? <>
                            <label className={s.uploadPhoto}>Загрузить фотографию
                                <input id={'file'} type={'file'} onChange={onUpdateUserPhoto} accept="image/*"
                                       hidden/>
                            </label>
                            {
                                editMode
                                    ?
                                    <div className={s.editProfile} onClick={disableEditMode}>Отмена</div>
                                    :
                                    <div className={s.editProfile} onClick={enableEditMode}>Редактировать профиль</div>
                            }
                        </> : null
                    }

                </div>
            </div>
            <div className={s.profileInfoContainer}>
                {editMode
                    ? <ProfileBlockForm disableEditMode={disableEditMode}
                                        profile={profile}
                                        updateProfile={updateProfile}
                                        localErrorMessage={localErrorMessage}
                                        isSubmittingSuccess={isSubmittingSuccess}/>
                    : <ProfileBlock profile={profile}
                                    ownProfile={ownProfile}
                                    status={status}
                                    updateUserStatus={updateUserStatus}
                                    />
                }
                <MyPosts ownProfile={ownProfile}
                         posts={posts}
                         addPost={addPost}
                         photo={profile.photos.small}
                         userName={profile.fullName}
                         removePost={removePost}/>
            </div>
        </div>
    )
}

export default Profile;