import React from 'react';
import classes from './users.module.css';
import User from "./User";

const Users = (props) => {

    return (
        <div>
            {props.users.map(user => <User user={user} followingInProgress={props.followingInProgress}
                                           followUnfollow={props.followUnfollow} key={user.id}/>)}
            <div className={classes.buttonMore}>
                <button onClick={() => props.onPageChanged(props.currentPage + 1)}>More</button>
            </div>

        </div>
    )
}

export default Users;