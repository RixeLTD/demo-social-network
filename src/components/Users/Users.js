import React from 'react';
import s from './users.module.scss';
import User from "./User";

const Users = (props) => {

    return (
        <div className={s.container}>
            {props.users.map(user => {
                return <User user={user} followingInProgress={props.followingInProgress}
                             followUnfollow={props.followUnfollow} key={user.id}
                             clearUserProfile={props.clearUserProfile}
                             isAuth={props.isAuth}
                />
            })}
            <button className={s.buttonMore} onClick={() => props.onPageChanged(props.currentPage - 1)}>
                Показать еще
            </button>
        </div>
    )
}

export default Users;