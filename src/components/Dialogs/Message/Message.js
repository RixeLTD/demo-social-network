import React from 'react';
import classes from './../Dialogs.module.css';

const Message = (props) => {

    let style = {
        'image': '',
        'side': ''
    };
    if (props.isMe === 1) {
        style.image = classes.leftImage;
        style.side = classes.left;
    } else {
        style.image = classes.rightImage;
        style.side = classes.right;
    }

    return (
        <div className={classes.message}>
                <div className={style.image}> </div>
                <div className={style.side}>{props.message}</div>
        </div>
    );
}

export default Message;