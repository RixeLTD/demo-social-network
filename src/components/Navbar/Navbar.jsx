import React from 'react';
import classes from './Navbar.module.css';
import FriendsBar from "./FriendsBar/FriendsBar";
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux';
import {clearUserProfile} from '../../redux/users-reduces';
import { getAuthUserId, getProfile } from '../../redux/profile-selectors';

const Navbar = ({profile, authUserId, clearUserProfile, ...props}) => {

    return (
        <nav className={classes.nav}>
            <div className={classes.item}>
                <NavLink to={'/profile/'} activeClassName={classes.active} onClick={ () => {
                    if (profile && profile.userId !== authUserId) {
                        clearUserProfile();
                    }
                }}>Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={'/dialogs/'} activeClassName={classes.active}>Messages</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to={'/users/'} activeClassName={classes.active}>Users</NavLink>
            </div>
            <div className={classes.item}>
                <span>Settings</span>
            </div>
            <div className={classes.item}>
                <span>News</span>
            </div>
            <div className={classes.item}>
                <span>Music</span>
            </div>
            <div className={classes.friendBar}>
                <span>Friends</span>
                <div className={classes.friendsImg}><FriendsBar /></div>
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        authUserId: getAuthUserId(state),
    }
}

const mapDispatchToProps = {
    clearUserProfile,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);