import React from 'react';
import s from './users.module.scss';
import noImage from "../../assets/images/noImage.png";
import {NavLink} from "react-router-dom";
import ButtonFollowUnfollow from "../../utils/ButtonFollowUnfollow/ButtonFollowUnfollow";

const User = (props) => {

    return (
        <div className={s.userBlock}>
            <div className={s.photoAndButton}>
                <div className={s.photoContainer}>
                    <NavLink to={"/profile/" + props.user.id} onClick={props.clearUserProfile}>
                        <img src={props.user.photos.small || noImage} className={s.photo} alt=""/>
                    </NavLink>
                </div>
                {props.isAuth
                    ? <ButtonFollowUnfollow followingInProgress={props.followingInProgress}
                                            user={props.user}
                                            followUnfollow={props.followUnfollow}/>
                    : null
                }


            </div>
            <div className={s.nameAndStatus}>
                <div>
                    <NavLink to={"/profile/" + props.user.id} onClick={props.clearUserProfile} className={s.name}>
                        {props.user.name}
                    </NavLink>
                </div>
                <div><span>{props.user.status}</span></div>
            </div>
        </div>
    )
}

export default User;