import React from 'react';
import s from './Header.module.scss';
import {NavLink} from "react-router-dom";
import logo from "./../../logo.png";

const Header = ({change, setChange, ...props}) => {

    function myFunction() {
        setChange(!change);
    }

    return <>
        <div className={`${s.hamburger} ${change ? s.change : null}`} onClick={myFunction}>
            <div className={s.bar1}> </div>
            <div className={s.bar2}> </div>
            <div className={s.bar3}> </div>
        </div>

        <img className={s.logo} src={logo} style={{width: "30px"}} alt=''/>
        <div className={s.login}>
            {props.isAuth
                ? <>
                    <span className={s.userName}>{props.fullName}</span>
                    <span className={s.delimiter}> </span>
                    <span className={s.logoutButton} onClick={props.logoutUser}>Выйти</span>
                </>
                : <NavLink to={'/login'} className={s.loginButton}>Войти</NavLink>}
        </div>
    </>
}

export default Header;