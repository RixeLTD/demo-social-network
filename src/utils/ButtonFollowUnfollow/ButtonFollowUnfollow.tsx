import React from 'react'
import s from './ButtonFollowUnfollow.module.scss'
import {UserType} from "../../types/types";
import {useDispatch} from 'react-redux'

type ButtonFollowUnfollowType = {
    followingInProgress: Array<number>
    user: UserType

    followUnfollow: (userId: number, action: "following" | "unfollowing") => void
}

const ButtonFollowUnfollow: React.FC<ButtonFollowUnfollowType> = ({
                                                                      followingInProgress,
                                                                      user,
                                                                      followUnfollow
                                                                  }) => {
const dispatch = useDispatch()
    return (
        <button disabled={followingInProgress.some(id => id === user.id)}
                className={`${s.button} ${user.followed ? s.buttonUnfollow : s.buttonFollow}`}
                onClick={() => user.followed
                    ? dispatch(followUnfollow(user.id, 'unfollowing'))
                    : dispatch(followUnfollow(user.id, 'following'))}>
            {user.followed ? 'Отписаться' : 'Подписаться'}</button>
    )
}

export default ButtonFollowUnfollow;