import React from 'react'
import s from './users.module.scss'
import {useDispatch} from 'react-redux'
import {Input, Select} from 'antd'
import {usersActions} from '../../redux/users-reduces'

type PropsType = {
    term: string
    friend: boolean | null
    setTerm: (term: string) => void
    setFriend: (friend: boolean | null) => void
    requestUsers: (page: number, pageSize: number, term: string, friend: null | boolean) => void
    pageSize: number
    clearUsers: () => void
    isFetching: boolean
}
export const SearchUsers: React.FC<PropsType> = React.memo(({
                                                                term,
                                                                friend,
                                                                setTerm,
                                                                setFriend,
                                                                requestUsers,
                                                                pageSize,
                                                                clearUsers,
                                                                isFetching
                                                            }) => {
    const dispatch = useDispatch()

    const onSubmit = () => {
        dispatch(usersActions.clearUsers())
        dispatch(requestUsers(1, pageSize, term, friend))
    }

    const onChange = (value: string) => {
        switch (value) {
            case 'null':
                setFriend(null)
                break
            case 'true':
                setFriend(true)
                break
            case 'false':
                setFriend(false)
                break
            default:
                setFriend(null)
        }
    }

    return (

        <form onSubmit={onSubmit} className={s.searchContainer}>
            <Input.Search
                onChange={(e) => {
                    setTerm(e.target.value)
                }}
                placeholder="Поиск"
                loading={isFetching}
                enterButton
                value={term}
                onSearch={() => {onSubmit()}}
            />
            <Select defaultValue="null" style={{ minWidth: 110 }} onChange={onChange}>
                <Select.Option value="null">Все</Select.Option>
                <Select.Option value="true">Друзья</Select.Option>
                <Select.Option value="false">Не друзья</Select.Option>
            </Select>
        </form>
    )
})