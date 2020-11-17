import React from 'react';
import s from './Navbar.module.scss';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {getAuthUserId, getProfile} from '../../redux/profile-selectors';
import {setUserProfile, setUserStatus} from "../../redux/profile-reducer";

const Navbar = ({profile, authUserId, setUserProfile, setUserStatus, setChange}) => {

    const setChangeFalse = () => {
        setChange(false);
    }

    return (
        <>
            <NavLink to={'/profile/'} className={s.navLink} activeClassName={s.active} onClick={() => {
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
            <span className={s.navLink}>
                <div className={s.navLinkTextDisabled}>Настройки</div>
            </span>
            <span className={s.navLink}>
                <div className={s.navLinkTextDisabled}>Новости</div>
            </span>
            <span className={s.navLink}>
                <div className={s.navLinkTextDisabled}>Музыка</div>
            </span>
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