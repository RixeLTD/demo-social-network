import React from 'react';
import s from './Message.module.scss';
import noImage from "../../../assets/images/noImage.png";

const Message = ({message, removeMessage, activeDialog, messageId, userName, photo}) => {

    return (
        <div className={s.block}>
            <div>
                <div className={s.photoContainer}>
                    <img className={s.photo} src={photo || noImage} alt=""/>
                </div>
            </div>
            <div className={s.userNameAndMessage}>
                <div className={s.userName}>{userName}</div>
                <div className={s.message}>{message}</div>
            </div>
            <div className={s.remove} onClick={() => {
                removeMessage(activeDialog, messageId);
            }}>X</div>
        </div>
    );
}

export default Message;
