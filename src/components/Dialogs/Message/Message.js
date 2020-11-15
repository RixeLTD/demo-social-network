import React from 'react';
import s from './Message.module.scss';

const Message = (props) => {

    const removeMessage = () => {
        props.removeMessage(props.activeDialog ,props.id);
    }

    return (
        <div className={s.block}>
            <div>
                <div className={s.photoContainer}>
                    <img className={s.photo} src={props.photo} alt=""/>
                </div>
            </div>
            <div className={s.userNameAndMessage}>
                <div className={s.userName}>{props.userName}</div>
                <div className={s.message}>{props.message}</div>
            </div>
            <div className={s.remove} onClick={removeMessage}>X</div>
        </div>
    );
}

export default Message;