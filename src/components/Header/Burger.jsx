import React from 'react';
import s from './Header.module.scss';

const Burger = ({mobileNav, setMobileNav, ...props}) => {

    function myFunction() {
        setMobileNav(!mobileNav);
    }

    return <>
        <div className={`${s.hamburger} ${mobileNav ? s.change : null}`} onClick={myFunction}>
            <div className={s.bar1}/>
            <div className={s.bar2}/>
            <div className={s.bar3}/>
        </div>
    </>
}

export default Burger;