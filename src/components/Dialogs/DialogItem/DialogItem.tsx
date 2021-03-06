import React from 'react';
import s from '../Dialogs.module.scss';
import {NavLink} from "react-router-dom";
import noImage from "../../../assets/images/noImage.png";
import { UserMessagesType } from '../../../redux/dialogs-reducer';

type PropsType = {
    userId: number
    userName: string
    photo: string
    myPhoto: string | null
    messages: Array<UserMessagesType>
}
const DialogItem: React.FC<PropsType> = ({messages, photo, userId, userName, myPhoto}) => {

    let isMe: boolean = false;
    let message: string = "";

    if (messages && messages.length !== 0) {
        isMe = messages[messages.length - 1]["isMe"];
        message = messages[messages.length - 1]["message"];
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

export default DialogItem