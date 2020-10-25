import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";

let DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={'textarea'} name={'message'} placeholder={'Enter your message'}/></div>
            <div><button type={'submit'}>Send message</button></div>
        </form>
    )
}

DialogsForm = reduxForm({
    form: 'messageForm'
})(DialogsForm)

const Dialogs = (props) => {

    let dialogsElements = props.messagesPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} image={d.image} key={d.id}/>);

    let messagesElements = props.messagesPage.messages.map(m => <Message message={m.message} isMe={m.isMe} key={m.id}/>);

    const onSubmit =(formData) => {
        props.onMessageClickContainer(formData.message);
    }


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <DialogsForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

export default Dialogs;