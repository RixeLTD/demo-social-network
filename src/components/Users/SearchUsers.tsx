import React from 'react'
import s from './users.module.scss'
import {Formik} from 'formik'
import {useDispatch} from 'react-redux'

type PropsType = {
    term: string
    friend: boolean | null
    setTerm: (term: string) => void
    setFriend: (friend: boolean | null) => void
    requestUsers: (page: number, pageSize: number, term: string, friend: null | boolean) => void
    pageSize: number
    clearUsers: () => void
}
export const SearchUsers: React.FC<PropsType> = React.memo(({
                                                                term,
                                                                friend,
                                                                setTerm,
                                                                setFriend,
                                                                requestUsers,
                                                                pageSize,
                                                                clearUsers
                                                            }) => {
    const dispatch = useDispatch()
    type FriendFormType = 'null' | 'true' | 'false'
    type Props = {
        term: string
        friend: FriendFormType
    }
    return (
        <Formik<Props>
            enableReinitialize
            initialValues={{
                term: term,
                friend: String(friend) as FriendFormType
            }}
            onSubmit={(values, {setSubmitting}) => {
                setTerm(values.term)
                let friend: null | boolean = values.friend === 'null' ? null : values.friend === 'true'
                setFriend(friend)
                dispatch(clearUsers())
                dispatch(requestUsers(1, pageSize, values.term, friend))
                setSubmitting(false)
            }}
        >
            {({
                  values,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
              }) => {
                return (
                    <form onSubmit={handleSubmit} className={s.searchContainer}>
                        <input
                            className={s.search}
                            name="term"
                            onChange={handleChange}
                            value={values.term}
                            placeholder="Поиск"
                            autoComplete="off"
                        />
                        <div className={s.radio}>
                            <input type="radio"
                                   name="friend"
                                   value="null"
                                   onChange={(e) => {
                                       handleChange(e)
                                       setFriend(null)
                                   }}
                                   checked={friend === null}
                            />Все
                            <input type="radio"
                                   name="friend"
                                   value="true"
                                   onChange={(e) => {
                                       handleChange(e)
                                       setFriend(true)
                                   }}
                                   checked={friend === true}
                            />Друзья
                            <input type="radio"
                                   name="friend"
                                   value="false"
                                   onChange={(e) => {
                                       handleChange(e)
                                       setFriend(false)
                                   }}
                                   checked={friend === false}
                            />Не друзья
                        </div>
                        <button type="submit"
                                disabled={Boolean(isSubmitting)}
                        >
                            Поиск
                        </button>
                    </form>
                )
            }}
        </Formik>
    )
})