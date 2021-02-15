import React from 'react';
import s from './Message.module.scss';
import noImage from "../../../assets/images/noImage.png";

const Message = ({setFindText, findText, message, removeMessage, activeDialog, id, userName, photo, ...props}) => {

    let find;

    if (findText) {
        find = message.toLowerCase().includes(findText.toLowerCase());
    }

    return (
        <div className={`${s.block} ${find ? s.find : null}`}>
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
                removeMessage(activeDialog, id);
            }}>X</div>
        </div>
    );
}

export default Message;
