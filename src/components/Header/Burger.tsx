import React from 'react';
import s from './Header.module.scss';

type PropsType = {
    mobileNav: boolean
    setMobileNav: (value: boolean) => void
}
const Burger: React.FC<PropsType> = ({
                                         mobileNav,
                                         setMobileNav
                                     }) => {

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