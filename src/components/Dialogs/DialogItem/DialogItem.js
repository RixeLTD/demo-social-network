import React from 'react';
import s from '../Dialogs.module.scss';
import {NavLink} from "react-router-dom";

const DialogItem = ({match, messages, ...props}) => {

    let lastMessage;
    try {
        lastMessage = messages[messages.length - 1]["message"];
    } catch (e)  {

    }

    return (
        <NavLink to={`/dialogs/${props.userId}`} className={s.link}>
            <div className={s.block}>
                <div>
                    <div className={s.photoContainer}>
                        <img className={s.photo} src={props.photo} alt=""/>
                    </div>
                </div>
                <div className={s.userNameAndMessage}>
                    <div className={s.userName}>{props.userName}</div>
                    <div className={s.message}>{lastMessage}</div>
                </div>
            </div>
        </NavLink>
    );
}

export default DialogItem;