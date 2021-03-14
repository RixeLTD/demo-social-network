import React from 'react'
import s from './users.module.scss'
import noImage from '../../assets/images/noImage.png'
import {Link} from 'react-router-dom'
import ButtonFollowUnfollow from '../../utils/ButtonFollowUnfollow/ButtonFollowUnfollow'
import {UserType} from '../../types/types'
import {useDispatch} from 'react-redux'
import {profileActions} from '../../redux/profile-reducer'
import {Avatar, Col, Row} from 'antd'

type UserComponentType = {
    user: UserType
    isAuth: boolean
    followingInProgress: Array<number>
    followUnfollow: (userId: number, action: 'following' | 'unfollowing') => void
}

export const User: React.FC<UserComponentType> = ({
                                                      user,
                                                      followingInProgress,
                                                      followUnfollow,
                                                      isAuth
                                                  }) => {
    const dispatch = useDispatch()
    const clearUserProfile = () => {
        dispatch(profileActions.setUserProfile(null))
    }
    return (
        <Row justify={'center'} className={s.userBlock}>
            <Col flex='120px' className={s.photoAndButton}>
                <div onClick={clearUserProfile} className={s.avatar}>
                    <Link to={'/profile/' + user.id}>
                        <Avatar src={user.photos.small || noImage} size={60}/>
                    </Link>
                </div>
                {isAuth
                    ? <ButtonFollowUnfollow followingInProgress={followingInProgress}
                                            user={user}
                                            followUnfollow={followUnfollow}/>
                    : null
                }
            </Col>
            <Col flex='auto' className={s.nameAndStatus}>
                <div>
                    <Link to={'/profile/' + user.id} onClick={clearUserProfile} className={s.name}>
                        {user.name}
                    </Link>
                </div>
                <span>{user.status}</span>
            </Col>
        </Row>
    )
}