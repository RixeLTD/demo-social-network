import React from 'react'
import s from './users.module.scss'
import User from "./User"
import {userType} from "../../types/types"

type usersType = {
    users: Array<userType>
    followingInProgress: Array<number>
    isAuth: boolean
    currentPage: number

    onPageChanged: (currentPage: number) => void
    followUnfollow: (userId: number, action: string) => void
    clearUserProfile: () => void
}

const Users: React.FC<usersType> = ({
                                        users,
                                        followingInProgress,
                                        followUnfollow,
                                        clearUserProfile,
                                        isAuth,
                                        onPageChanged,
                                        currentPage
                                    }) => {

    return (
        <div className={s.container}>
            {users.map(user => {
                return <User user={user}
                             followingInProgress={followingInProgress}
                             followUnfollow={followUnfollow}
                             key={user.id}
                             clearUserProfile={clearUserProfile}
                             isAuth={isAuth}
                />
            })}
            <button className={s.buttonMore} onClick={() => onPageChanged(currentPage - 1)}>
                Показать еще
            </button>
        </div>
    )
}

export default Users