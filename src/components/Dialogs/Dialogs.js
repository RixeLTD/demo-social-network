import React, {useEffect, useState} from 'react';
import {addMessage, removeMessage} from "../../redux/dialogs-reducer";
import DialogsFormik from "./DialogsFormik";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Message from "./Message/Message";
import s from "./Dialogs.module.scss";
import DialogItem from "./DialogItem/DialogItem";

const Dialogs = ({match, dialogs, ...props}) => {

    let [activeDialog, setActiveDialog] = useState(null);
    let [messages, setMessages] = useState(null);

    useEffect(() => {
        let userId = Number(match.params.userId);
        if (userId) {
            setActiveDialog(userId);
            let messages = dialogs.find(user => user.userId === userId);
            setMessages(messages);
        } else {
            setActiveDialog(null);
        }
    }, [activeDialog, match.params.userId, dialogs]);

    const onSubmit = (values) => {
        props.addMessage(values.message, activeDialog);
    }

    if (activeDialog) {
        let messagesElements = messages.messages.map(m => <Message key={m.id}
                                                                   id={m.id}
                                                                   activeDialog={activeDialog}
                                                                   message={m.message}
                                                                   userName={m.isMe ? props.myName : messages.userName}
                                                                   photo={m.isMe ? props.myPhoto : messages.photo}
                                                                   removeMessage={props.removeMessage}/>);

        return (
            <>
                <div className={s.container}>
                    {messagesElements}
                    <DialogsFormik onSubmit={onSubmit}
                                   activeDialog={activeDialog}/>
                </div>

            </>
        )
    }

    let dialogsElements = dialogs.map(d => <DialogItem userId={d.userId}
                                                       userName={d.userName}
                                                       photo={d.photo}
                                                       messages={d.messages}
                                                       key={d.userId}
                                                       match={match}
                                                       setMessages={props.setMessages}/>);

    return (
        <>
            <div className={s.container}>
                <div className={s.search}>
                    <input type="text" placeholder="поиск" className={s.searchInput}/>
                </div>
                {dialogsElements.reverse()}
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        dialogs: state.messagesPage.dialogs,
        myPhoto: state.auth.photo,
        myName: state.auth.fullName,
    }
}

const mapDispatchToProps = {
    addMessage,
    removeMessage,
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(Dialogs);