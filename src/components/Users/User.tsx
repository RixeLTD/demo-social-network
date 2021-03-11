import React from 'react'
import s from './users.module.scss'
import noImage from '../../assets/images/noImage.png'
import {NavLink} from 'react-router-dom'
import ButtonFollowUnfollow from '../../utils/ButtonFollowUnfollow/ButtonFollowUnfollow'
import {UserType} from '../../types/types'
import {useDispatch} from 'react-redux'
import {profileActions} from '../../redux/profile-reducer'

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
        <div className={s.userBlock}>
            <div className={s.photoAndButton}>
                <div className={s.photoContainer}>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small || noImage} onClick={clearUserProfile} className={s.photo} alt=""/>
                    </NavLink>
                </div>
                {isAuth
                    ? <ButtonFollowUnfollow followingInProgress={followingInProgress}
                                            user={user}
                                            followUnfollow={followUnfollow}/>
                    : null
                }


            </div>
            <div className={s.nameAndStatus}>
                <div>
                    <NavLink to={'/profile/' + user.id} onClick={clearUserProfile} className={s.name}>
                        {user.name}
                    </NavLink>
                </div>
                <div><span>{user.status}</span></div>
            </div>
        </div>
    )
}