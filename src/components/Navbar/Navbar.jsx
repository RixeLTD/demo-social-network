import React from 'react';
import s from './Navbar.module.scss';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {getAuthUserId, getProfile} from '../../redux/profile-selectors';
import {setUserProfile, setUserStatus} from "../../redux/profile-reducer";

const Navbar = ({profile, authUserId, setUserProfile, setUserStatus, setMobileNav}) => {

    const setChangeFalse = () => {
        setMobileNav(false);
    }

    return (
        <>
            <NavLink to={'/profile/'} className={s.navLink} activeClassName={s.active} onClick={() => {
                window.scrollTo({top: 0})
                setChangeFalse();
                if (profile && profile.userId !== authUserId) {
                    setUserProfile(null);
                    setUserStatus(null);
                }
            }}>
                <div className={s.navLinkText}>Профиль</div>
            </NavLink>
            <NavLink to={'/dialogs/'} className={s.navLink} activeClassName={s.active} onClick={setChangeFalse}>
                <div className={s.navLinkText}>Сообщения</div>
            </NavLink>
            <NavLink to={'/users/'} className={s.navLink} activeClassName={s.active} onClick={setChangeFalse}>
                <div className={s.navLinkText}>Пользователи</div>
            </NavLink>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        authUserId: getAuthUserId(state),
    }
}

const mapDispatchToProps = {
    setUserProfile,
    setUserStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);