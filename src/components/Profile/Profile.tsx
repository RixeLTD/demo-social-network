import React, {useEffect, useState} from 'react'
import {MyPosts} from './MyPosts/MyPosts'
import s from './Profile.module.scss'
import noImage from '../../assets/images/noImage.png'
import {ProfileBlockForm} from './ProfileBlock/ProfileBlockForm'
import {ProfileBlock} from './ProfileBlock/ProfileBlock'
import {useDispatch, useSelector} from 'react-redux'
import {getProfile, selectIsFetching} from '../../redux/profile-selectors'
import {getUserProfile, getUserStatus, profileActions} from '../../redux/profile-reducer'
import {Preloader} from '../common/preloader/Preloader'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {getAuthUserId} from '../../redux/auth-selectors'
import {Button, Col, Grid, Image, Row} from 'antd'
import {UploadComponent} from './UploadComponent'

const Profile: React.FC<RouteComponentProps<{ userId: string }>> = ({
                                                                        match,
                                                                        history,
                                                                    }) => {
    const profile = useSelector(getProfile)
    const authUserId = useSelector(getAuthUserId)
    const isFetching = useSelector(selectIsFetching)
    const dispatch = useDispatch()
    const {useBreakpoint} = Grid
    const {lg} = useBreakpoint()


    useEffect(() => {
        window.scrollTo({top: 0})
    }, [])

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

    if (!profile || isFetching) {
        return <Preloader/>
    }

    const ownProfile: boolean = authUserId === profile.userId

    return (
        <Row wrap={!lg}>
            <Col flex={!lg ? 'auto' : 'none'} className={s.profileLeftBlock}>
                <Image width={175} className={s.userImage}
                       src={profile.photos.large || noImage}
                />
                {ownProfile
                    ? <>
                        <UploadComponent className={s.uploadPhoto}/>
                        {
                            editMode
                                ? <Button onClick={disableEditMode} className={s.editModeButton}>Отмена</Button>
                                : <Button onClick={enableEditMode} type="primary" className={s.editModeButton}>Редактировать профиль</Button>
                        }
                    </> : null
                }
            </Col>
            <Col flex='auto'>
                <div className={s.profileRightBlock}>
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
            </Col>
        </Row>
    )
}

export default withRouter(Profile)