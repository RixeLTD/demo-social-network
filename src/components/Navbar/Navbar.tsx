import React from 'react'
import s from './Navbar.module.scss'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {profileActions} from '../../redux/profile-reducer'
import {getAuthUserId} from '../../redux/auth-selectors'
import {getProfile} from '../../redux/profile-selectors'

type PropsType = {
    setMobileNav: (mobileNav: boolean) => void
}
export const Navbar: React.FC<PropsType> = ({setMobileNav}) => {
    const authUserId = useSelector(getAuthUserId)
    const profile = useSelector(getProfile)
    const dispatch = useDispatch()

    const onClick = () => {
        window.scrollTo({top: 0})
        setMobileNav(false)
    }

    return (
        <>
            <NavLink to={'/profile/'} className={s.navLink} activeClassName={s.active} onClick={() => {
                onClick()
                if (authUserId !== profile?.userId) {
                    dispatch(profileActions.setUserProfile(null))
                }
            }}>
                <div className={s.navLinkText}>Профиль</div>
            </NavLink>
            <NavLink to={'/dialogs/'} className={s.navLink} activeClassName={s.active} onClick={onClick}>
                <div className={s.navLinkText}>Сообщения</div>
            </NavLink>
            <NavLink to={'/users/'} className={s.navLink} activeClassName={s.active} onClick={onClick}>
                <div className={s.navLinkText}>Пользователи</div>
            </NavLink>
        </>
    )
}