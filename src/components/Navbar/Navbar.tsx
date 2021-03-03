import React from 'react'
import s from './Navbar.module.scss'
import {NavLink} from "react-router-dom"

type PropsType = {
    setMobileNav: (mobileNav: boolean) => void
}
const Navbar: React.FC<PropsType> = ({setMobileNav}) => {

    const onClick = () => {
        setMobileNav(false)
    }
    return (
        <>
            <NavLink to={'/profile/'} className={s.navLink} activeClassName={s.active} onClick={() => {
                window.scrollTo({top: 0})
                onClick()
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
    );
}

export default Navbar