import React, {useEffect, useState} from 'react'
import s from './users.module.scss'
import {User} from './User'
import {SearchUsers} from './SearchUsers'
import {useDispatch, useSelector} from 'react-redux'
import {getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers} from '../../redux/users-selectors'
import {getIsAuth} from '../../redux/auth-selectors'
import {requestUsers, usersActions} from '../../redux/users-reduces'
import {NumberParam, StringParam, useQueryParam} from 'use-query-params'
import {Button} from 'antd'
import {Helmet} from 'react-helmet'

export const Users: React.FC = React.memo(() => {
    const users = useSelector(getUsers)
    const isAuth = useSelector(getIsAuth)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const followingInProgress = useSelector(getFollowingInProgress)
    const isFetching = useSelector(getIsFetching)
    const dispatch = useDispatch()

    let [term, setTerm] = useState<string>('')
    let [friend, setFriend] = useState<boolean | null>(null)

    const [queryTerm, setQueryTerm] = useQueryParam('term', StringParam)
    const [queryFriend, setQueryFriend] = useQueryParam('friend', StringParam)
    const [queryPage, setQueryPage] = useQueryParam('page', NumberParam)

    useEffect(() => {
        const page = queryPage || currentPage
        let newTerm = term
        let newFriend = friend

        if (queryTerm) {
            newTerm = queryTerm
            setTerm(newTerm)
        }
        switch (queryFriend) {
            case 'true':
                newFriend = true
                setFriend(true)
                break
            case 'false':
                newFriend = false
                setFriend(false)
        }
        if (page !== 1 || newTerm !== '' || newFriend !== null) {
            dispatch(usersActions.clearUsers())
            dispatch(requestUsers(page, pageSize, newTerm, newFriend))
        }
    }, [])

    useEffect(() => {
        term ? setQueryTerm(term) : setQueryTerm(undefined)
        friend !== null ? setQueryFriend(String(friend)) : setQueryFriend(undefined)
        currentPage !== 1 ? setQueryPage(currentPage) : setQueryPage(undefined)
    }, [term, friend, currentPage])

    useEffect
    (() => {
        return () => {
            dispatch(usersActions.clearUsers())
            dispatch(requestUsers(1, pageSize))
        }
    }, [])


    let mapUsers = users.map(user => <User user={user}
                                           followingInProgress={followingInProgress}
                                           key={user.id}
                                           isAuth={isAuth}

        />
    )

    const onPageChange = () => {
        dispatch(requestUsers(currentPage + 1, pageSize, term, friend))
    }
    const pages = totalUsersCount % pageSize === 0 ? totalUsersCount / pageSize : Math.floor(totalUsersCount / pageSize) + 1

    return (
        <div className={s.container}>
            <Helmet>
                <title>Пользователи</title>
            </Helmet>
            <SearchUsers term={term}
                         friend={friend}
                         setTerm={setTerm}
                         setFriend={setFriend}
                         requestUsers={requestUsers}
                         pageSize={pageSize}
                         clearUsers={usersActions.clearUsers}
                         isFetching={isFetching}
            />
            {mapUsers}
            {currentPage < pages ?
                <Button type='primary' loading={isFetching} onClick={onPageChange} className={s.buttonMore}>
                    Показать еще
                </Button>
                : null}

        </div>
    )
})