import React from 'react';
import DialogsFormik from "./DialogsFormik";
import Message from "./Message";

const MessageContainer = ({currentUser, removeMessage, addMessage, activeDialog, myName, myPhoto}) => {

    let messagesElements = currentUser.messages.map(m => <Message key={m.id}
                                                                  messageId={m.id}
                                                                  activeDialog={activeDialog}
                                                                  message={m.message}
                                                                  userName={m.isMe ? myName : currentUser.data.userName}
                                                                  photo={m.isMe ? myPhoto : currentUser.data.photo}
                                                                  removeMessage={removeMessage}
    />)

    return (
        <>
            {messagesElements}
            <DialogsFormik activeDialog={activeDialog}
                           addMessage={addMessage}/>
        </>
    );
}

export default MessageContainer;
