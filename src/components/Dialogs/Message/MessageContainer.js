import React, {useEffect} from 'react';
import DialogsFormik from "../DialogsFormik";
import Message from "./Message";

const MessageContainer = ({setFindText, findText, messages, removeMessage, addMessage, activeDialog, myName, myPhoto, ...props}) => {

    useEffect(() => {
        return () => {
            setFindText(null);
        }
    })

    let messagesElements = messages.messages.map(m => <Message key={m.id}
                                                               id={m.id}
                                                               activeDialog={activeDialog}
                                                               message={m.message}
                                                               userName={m.isMe ? myName : messages.userName}
                                                               photo={m.isMe ? myPhoto : messages.photo}
                                                               removeMessage={removeMessage}
                                                               findText={findText}
                                                               setFindText={setFindText}/>);

    return (
        <>
            {messagesElements}
            <DialogsFormik activeDialog={activeDialog}
                           addMessage={addMessage}/>
        </>
    );
}

export default MessageContainer;
