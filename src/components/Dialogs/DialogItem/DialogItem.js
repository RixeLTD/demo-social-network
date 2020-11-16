import React from 'react';
import s from '../Dialogs.module.scss';
import {NavLink} from "react-router-dom";

const DialogItem = ({match, messages, findText, ...props}) => {

    let lastMessageIsMe;
    let lastMessage;
    let findUser;
    let findUserIsMe;
    let findMessage;

    if (messages && messages.length !== 0) {
        lastMessageIsMe = messages[messages.length - 1]["isMe"];
        lastMessage = messages[messages.length - 1]["message"];
    }

    if (findText) {
        findUser = messages.find(m => m.message.toLowerCase().includes(findText.toLowerCase()));
        if (findUser) {
            findUserIsMe = findUser.isMe;
            findMessage = findUser.message;
        }
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
                    <div className={s.messageContainer}>
                        {lastMessageIsMe || findUserIsMe ? <div className={s.myPhotoContainer}>
                            <img src={props.myPhoto} className={s.myPhoto} alt=""/>
                        </div> : null}
                        <div className={s.message}>{findMessage || lastMessage}</div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
}

export default DialogItem;