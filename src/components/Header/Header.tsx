import React from 'react';
import s from './Header.module.scss';
import {NavLink} from "react-router-dom";
import logo from "./../../logo.png";
import Burger from "./Burger";

type PropsType = {
    isAuth: boolean
    fullName: string | null
    logoutUser: () => void
    mobileNav: boolean
    setMobileNav: (value: boolean) => void
}
const Header: React.FC<PropsType> = ({
                                         mobileNav,
                                         setMobileNav,
                                         fullName,
                                         logoutUser,
                                         isAuth
                                     }) => {

    return <>
        <Burger mobileNav={mobileNav}
                setMobileNav={setMobileNav}/>
        <NavLink to={"/"} onClick={() => {
            window.scrollTo({top: 0})
        }}>
            <img className={s.logo} src={logo} style={{width: "30px"}} alt=''/>
        </NavLink>
        <div className={s.login}>
            {isAuth
                ? <>
                    <span className={s.userName}>{fullName}</span>
                    <span className={s.delimiter}> </span>
                    <span className={s.logoutButton} onClick={logoutUser}>Выйти</span>
                </>
                : <NavLink to={'/login'} className={s.loginButton}>Войти</NavLink>}
        </div>
    </>
}

export default Header;