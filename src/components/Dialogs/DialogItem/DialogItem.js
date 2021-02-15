import React from 'react';
import s from '../Dialogs.module.scss';
import {NavLink} from "react-router-dom";
import noImage from "../../../assets/images/noImage.png";

const DialogItem = ({match, messages, findText, photo, userId, userName, myPhoto, ...props}) => {

    let isMe;
    let message;

    if (findText) {
        let findUser = messages.find(m => m.message.toLowerCase().includes(findText.toLowerCase()));
        if (findUser) {
            isMe = findUser.isMe;
            message = findUser.message;
        }
    } else {
        if (messages && messages.length !== 0) {
            isMe = messages[messages.length - 1]["isMe"];
            message = messages[messages.length - 1]["message"];
        }
    }

    return (
        <NavLink to={`/dialogs/${userId}`} className={s.link}>
            <div className={s.block}>
                <div>
                    <div className={s.photoContainer}>
                        <img className={s.photo} src={photo} alt=""/>
                    </div>
                </div>
                <div className={s.userNameAndMessage}>
                    <div className={s.userName}>{userName}</div>
                    <div className={s.messageContainer}>
                        {isMe ? <div className={s.myPhotoContainer}>
                            <img src={myPhoto || noImage} className={s.myPhoto} alt=""/>
                        </div> : null}
                        <div className={s.message}>{message}</div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
}

export default DialogItem;