import React, {useEffect, useState} from 'react';
import {addMessage, removeMessage} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import s from "./Dialogs.module.scss";
import DialogItem from "./DialogItem/DialogItem";
import MessageContainer from "./Message/MessageContainer";

const Dialogs = ({match, dialogs, ...props}) => {

    let [activeDialog, setActiveDialog] = useState(null);
    let [messages, setMessages] = useState(null);
    let [filteredUsers, setFilteredUsers] = useState(dialogs);
    let [findText, setFindText] = useState(null);

    useEffect(() => {
        let userId = Number(match.params.userId);
        if (userId) {
            setActiveDialog(userId);
            setMessages(dialogs.find(user => user.userId === userId));
        } else {
            setActiveDialog(null);
        }
        return () => {
            setFilteredUsers(dialogs);
        }
    }, [activeDialog, match.params.userId, dialogs]);

    if (activeDialog) {

        return (
            <div className={s.container}>
                <MessageContainer myPhoto={props.myPhoto}
                                  myName={props.myName}
                                  activeDialog={activeDialog}
                                  addMessage={props.addMessage}
                                  removeMessage={props.removeMessage}
                                  messages={messages}
                                  findText={findText}
                                  setFindText={setFindText}
                />
            </div>
        )
    }

    const filter = (e) => {
        setFilteredUsers(dialogs.filter(u => u.userName.toLowerCase().includes(e.target.value.toLowerCase())
            || u.messages.find(m => m.message.toLowerCase().includes(e.target.value.toLowerCase()))));
        setFindText(e.target.value);
    }

    let dialogsElements = filteredUsers.map(d => <DialogItem userId={d.userId}
                                                             userName={d.userName}
                                                             photo={d.photo}
                                                             myPhoto={props.myPhoto}
                                                             messages={d.messages}
                                                             key={d.userId}
                                                             match={match}
                                                             findText={findText}/>);

    return (
        <>
            <div className={s.container}>
                <div className={s.search}>
                    <input type="text" placeholder="поиск" className={s.searchInput} onChange={filter}/>
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