import React, {useEffect, useState} from 'react'
import {MyPosts} from './MyPosts/MyPosts'
import s from './Profile.module.scss'
import noImage from '../../assets/images/noImage.png'
import {ProfileBlockForm} from './ProfileBlock/ProfileBlockForm'
import {ProfileBlock} from './ProfileBlock/ProfileBlock'
import {UpdateUserPhotoType} from '../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {getProfile} from '../../redux/profile-selectors'
import {getUserProfile, getUserStatus, profileActions, updateUserPhoto} from '../../redux/profile-reducer'
import {Preloader} from '../common/preloader/Preloader'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {getAuthUserId} from '../../redux/auth-selectors'

const Profile: React.FC<RouteComponentProps<{ userId: string }>> = ({
                                                                        match,
                                                                        history,
                                                                    }) => {

    const profile = useSelector(getProfile)
    const authUserId = useSelector(getAuthUserId)
    const dispatch = useDispatch()

    useEffect(() => {
        let userId: number | null = +match.params.userId
        if (!userId) {
            userId = authUserId
            if (!userId) {
                history.push('/login/')
            }
        }
        if (userId && userId !== profile?.userId) {
            dispatch(getUserProfile(userId))
            dispatch(getUserStatus(userId))
        }
    }, [authUserId, match.params.userId, getUserProfile, getUserStatus, history, profile?.userId])

    let [editMode, setEditMode] = useState(false)

    const enableEditMode = () => {
        dispatch(profileActions.setProfileFormErrors(null))
        setEditMode(true)
    }

    const disableEditMode = () => {
        setEditMode(false)
    }

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
                    />
                    : <ProfileBlock profile={profile}
                                    ownProfile={ownProfile}
                    />
                }
                <MyPosts ownProfile={ownProfile}
                         photo={profile.photos.small}
                         userName={profile.fullName}
                />
            </div>
        </div>
    )
}

export default withRouter(Profile)