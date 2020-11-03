import React from 'react';
import classes from './users.module.css';
import noImage from "../../assets/images/noImage.png";
import {NavLink} from "react-router-dom";

const User = (props) => {

    return (
        <div className={classes.userBlock}>
            <div className={classes.imgAndButton}>
                <div className={classes.photo}>
                    <NavLink to={"/profile/" + props.user.id} onClick={props.clearUserProfile}>
                        <img src={props.user.photos.small || noImage} alt=""/>
                    </NavLink>
                </div>
                <button disabled={props.followingInProgress.some(id => id === props.user.id)} className={classes.button}
                        onClick={() => props.user.followed
                            ? props.followUnfollow(props.user.id, 'unfollowing')
                            : props.followUnfollow(props.user.id, 'following')}>
                    {props.user.followed ? 'Unfollow' : 'Follow'}</button>
            </div>
            <div className={classes.rightBlock}>
                <div className={classes.nameAndLocation}>
                    <span className={classes.name}>Name: {props.user.name}</span>
                </div>
                <div className={classes.status}><span>Status: {props.user.status}</span></div>
            </div>
        </div>
    )
}

export default User;