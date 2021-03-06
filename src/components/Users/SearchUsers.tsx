import React from "react"
import s from './users.module.scss'
import {Formik} from "formik";
import {UserType} from "../../types/types";

type PropsType = {
    requestSearchUsers: (currentSearchPage: number, pageSize: number, term: string, friend: boolean | null) => void
    currentSearchPage: number
    searchUsers: Array<UserType>
    setTerm: (term: string) => void
    setFriend: (friend: boolean | null) => void
    friend: boolean | null
}
const SearchUsers: React.FC<PropsType> = ({
                                              requestSearchUsers,
                                              currentSearchPage,
                                              setTerm,
                                              setFriend,
                                              friend
                                          }) => {

    type Props = {
        text: string
    }
    return (
        <Formik<Props>
            initialValues={{
                text: ""
            }}
            onSubmit={(values) => {
                requestSearchUsers(currentSearchPage, 10, values.text, friend)
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
                            name="text"
                            onChange={(e) => {
                                handleChange(e)
                                setTerm(e.target.value)
                            }}
                            value={values.text}
                            placeholder="Поиск"
                            autoComplete="off"
                        />
                        <input type="radio"
                               name="friend"
                               value="null"
                               onChange={() => {
                                   setFriend(null)
                               }}
                        />Все
                        <input type="radio"
                               name="friend"
                               value="true"
                               onChange={() => {
                                   setFriend(true)
                               }}
                        />Друзья
                        <input type="radio"
                               name="friend"
                               value="false"
                               onChange={() => {
                                   setFriend(false)
                               }}
                        />Не друзья
                        <button className={s.buttonSearch} type="submit"
                                // disabled={Boolean(isSubmitting || !values.text)}
                        >
                            Поиск
                        </button>
                    </form>
                )
            }}
        </Formik>
    )
}

export default SearchUsers