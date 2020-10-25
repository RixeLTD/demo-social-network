import React from 'react';
import classes from './../Navbar.module.css';
import {NavLink} from "react-router-dom";

// let friendsBar = props.store.getState().messagesPage.dialogs.map( f => <FriendsBar image={f.image} id={f.id} name={f.name} key={f.id}/>);
// friendsBar = friendsBar.slice(0, 3);

const FriendsBar = (props) => {
    let path = '/dialogs/' + props.id;

    return (

        <NavLink to={path}>
            <div className={classes.item}>
                <img src={props.image} alt=""/>
                <div>{props.name}</div>
            </div>
        </NavLink>

    );
}

export default FriendsBar;