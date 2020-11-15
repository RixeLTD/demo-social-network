import React from 'react';
import s from './ButtonFollowUnfollow.module.scss';

const ButtonFollowUnfollow = (props) => {

    return (
        <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                className={`${s.button} ${props.user.followed ? s.buttonUnfollow : s.buttonFollow}`}
                onClick={() => props.user.followed
                    ? props.followUnfollow(props.user.id, 'unfollowing')
                    : props.followUnfollow(props.user.id, 'following')}>
            {props.user.followed ? 'Отписаться' : 'Подписаться'}</button>
    )
}

export default ButtonFollowUnfollow;