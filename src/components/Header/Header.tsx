import React from 'react'
import s from './Header.module.scss'
import {NavLink} from 'react-router-dom'
import logo from './../../logo.png'
import Burger from './Burger'
import {useDispatch, useSelector} from 'react-redux'
import {getIsAuth, getMyName} from '../../redux/auth-selectors'
import {logoutUser} from '../../redux/auth-reduces'

type PropsType = {
    mobileNav: boolean
    setMobileNav: (value: boolean) => void
}
export const Header: React.FC<PropsType> = ({
                                                mobileNav,
                                                setMobileNav,
                                            }) => {
    const isAuth = useSelector(getIsAuth)
    const myName = useSelector(getMyName)
    const dispatch = useDispatch()

    return <>
        <Burger mobileNav={mobileNav}
                setMobileNav={setMobileNav}/>
        <NavLink to={'/'} onClick={() => {
            window.scrollTo({top: 0})
        }}>
            <img className={s.logo} src={logo} style={{width: '30px'}} alt=''/>
        </NavLink>
        <div className={s.login}>
            {isAuth
                ? <>
                    <span className={s.userName}>{myName}</span>
                    <span className={s.delimiter}> </span>
                    <span className={s.logoutButton} onClick={() => {dispatch(logoutUser)}}>Выйти</span>
                </>
                : <NavLink to={'/login'} className={s.loginButton}>Войти</NavLink>}
        </div>
    </>
}
