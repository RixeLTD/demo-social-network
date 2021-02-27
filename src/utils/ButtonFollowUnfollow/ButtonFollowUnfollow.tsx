import React from 'react'
import s from './ButtonFollowUnfollow.module.scss'
import {UserType} from "../../types/types";

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

    return (
        <button disabled={followingInProgress.some(id => id === user.id)}
                className={`${s.button} ${user.followed ? s.buttonUnfollow : s.buttonFollow}`}
                onClick={() => user.followed
                    ? followUnfollow(user.id, 'unfollowing')
                    : followUnfollow(user.id, 'following')}>
            {user.followed ? 'Отписаться' : 'Подписаться'}</button>
    )
}

export default ButtonFollowUnfollow;