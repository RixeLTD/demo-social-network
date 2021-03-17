import React from 'react'
import {UserType} from '../types/types'
import {useDispatch} from 'react-redux'
import {Button} from 'antd'
import {followUnfollow} from '../redux/users-reduces'

type ButtonFollowUnfollowType = {
    followingInProgress: Array<number>
    user: UserType
}

const ButtonFollowUnfollow: React.FC<ButtonFollowUnfollowType> = ({
                                                                      followingInProgress,
                                                                      user
                                                                  }) => {
    const dispatch = useDispatch()
    return (
        <Button type={user.followed ? undefined : 'primary'}
                size='small'
                onClick={() => user.followed
                    ? dispatch(followUnfollow(user.id, 'unfollowing'))
                    : dispatch(followUnfollow(user.id, 'following'))}
                disabled={followingInProgress.some(id => id === user.id)}
        >
            {user.followed ? 'Отписаться' : 'Подписаться'}
        </Button>

    )
}

export default ButtonFollowUnfollow