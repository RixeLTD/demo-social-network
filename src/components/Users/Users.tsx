import React, {useEffect, useState} from 'react'
import s from './users.module.scss'
import User from "./User"
import {UserType} from "../../types/types"
import SearchUsers from './SearchUsers'

type UsersType = {
    users: Array<UserType>
    searchUsers: Array<UserType>
    followingInProgress: Array<number>
    isAuth: boolean
    currentPage: number
    currentSearchPage: number
    requestUsers: (page: number, pageSize: number) => void
    followUnfollow: (userId: number, action: "following" | "unfollowing") => void
    requestSearchUsers: (currentSearchPage: number, pageSize: number, term: string, friend: boolean | null) => void
    totalUsersCount: number
    totalSearchUsersCount: number
}

const Users: React.FC<UsersType> = ({
                                        users,
                                        searchUsers,
                                        followingInProgress,
                                        followUnfollow,
                                        isAuth,
                                        requestUsers,
                                        currentPage,
                                        currentSearchPage,
                                        requestSearchUsers,
                                        totalUsersCount,
                                        totalSearchUsersCount
                                    }) => {

    let [term, setTerm] = useState<string>("")
    let [friend, setFriend] = useState<boolean | null>(null)
    
    let mapSearchUsers = searchUsers.map(user => {
            return <User user={user}
                         followingInProgress={followingInProgress}
                         followUnfollow={followUnfollow}
                         key={user.id}
                         isAuth={isAuth}
            />
        })

    let mapUsers = users.map(user => {
        return <User user={user}
                     followingInProgress={followingInProgress}
                     followUnfollow={followUnfollow}
                     key={user.id}
                     isAuth={isAuth}
        />
    })

    const changePage = () => {
        if (mapSearchUsers.length > 0) {
            requestSearchUsers(currentSearchPage + 1, 10, term, friend)
        } else {
            requestUsers(currentPage - 1, 10)
        }
    }

    return (
        <div className={s.container}>

                <SearchUsers requestSearchUsers={requestSearchUsers}
                             currentSearchPage={currentSearchPage}
                             searchUsers={searchUsers}
                             setTerm={setTerm}
                             setFriend={setFriend}
                             friend={friend}
                />

            {mapSearchUsers.length > 0 ? mapSearchUsers : mapUsers}
            <button className={s.buttonMore} onClick={() => changePage()}>
                Показать еще
            </button>
        </div>
    )
}

export default Users