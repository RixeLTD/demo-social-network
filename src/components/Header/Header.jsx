import React from 'react';
import s from './Header.module.scss';
import {NavLink} from "react-router-dom";
import logo from "./../../logo.png";

const Header = (props) => {

    return <header className={s.header}>
        <img className={s.logo} src={logo} style={{width: "30px"}}  alt=''/>
        <div className={s.login}>
            { props.isAuth
                ? <>
                    <span className={s.userName}>{props.fullName}</span>
                    <span className={s.delimiter}> </span>
                    <span className={s.logoutButton} onClick={props.logoutUser}>Выйти</span>
                </>
                : <NavLink to={'/login'} className={s.loginButton}>Войти</NavLink> }
        </div>
    </header>
}

export default Header;