import React from 'react'
import {UserType} from '../../types/types'
import {useDispatch} from 'react-redux'
import {Button} from 'antd'

type ButtonFollowUnfollowType = {
    followingInProgress: Array<number>
    user: UserType

    followUnfollow: (userId: number, action: 'following' | 'unfollowing') => void
}

const ButtonFollowUnfollow: React.FC<ButtonFollowUnfollowType> = ({
                                                                      followingInProgress,
                                                                      user,
                                                                      followUnfollow
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