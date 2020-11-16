import React, {useEffect, useState} from 'react';
import {addMessage, removeMessage} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import s from "./Dialogs.module.scss";
import MessageContainer from "./Message/MessageContainer";
import DialogItemContainer from "./DialogItem/DialogItemContainer";

const Dialogs = ({match, dialogs, myPhoto, myName, addMessage, removeMessage, ...props}) => {

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
            setMessages(null);
        }
        return () => {
            setFilteredUsers(dialogs);
        }
    }, [activeDialog, match.params.userId, dialogs]);

    const filter = (e) => {
        setFilteredUsers(dialogs.filter(u => u.userName.toLowerCase().includes(e.target.value.toLowerCase())
            || u.messages.find(m => m.message.toLowerCase().includes(e.target.value.toLowerCase()))));
        setFindText(e.target.value);
    }

    if (activeDialog) {
        return (
            <div className={s.container}>
                <MessageContainer myPhoto={myPhoto}
                                  myName={myName}
                                  activeDialog={activeDialog}
                                  addMessage={addMessage}
                                  removeMessage={removeMessage}
                                  messages={messages}
                                  findText={findText}
                                  setFindText={setFindText}
                />
            </div>
        )
    }

    return (
        <>
            <div className={s.container}>
                <div className={s.search}>
                    <input type="text" placeholder="поиск" className={s.searchInput} onChange={filter}/>
                </div>
                <DialogItemContainer myPhoto={myPhoto}
                                     myName={myName}
                                     findText={findText}
                                     match={match}
                                     filteredUsers={filteredUsers}
                />
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