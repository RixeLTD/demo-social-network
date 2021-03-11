import React from 'react'
import {MessageFormik} from './MessageFormik'
import {Message} from './Message'
import {DialogElementType, dialogsActions} from '../../../redux/dialogs-reducer'

type PropsType = {
    myPhoto: string | null
    myName: string | null
    activeDialog: number
    currentUser: DialogElementType | null
}
const MessageContainer: React.FC<PropsType> = ({
                                                   currentUser,
                                                   activeDialog,
                                                   myName,
                                                   myPhoto
                                               }) => {

    let messagesElements = currentUser?.messages.map(m => <Message key={m.id}
                                                                  messageId={m.id}
                                                                  activeDialog={activeDialog}
                                                                  message={m.message}
                                                                  userName={m.isMe ? myName : currentUser.data.userName}
                                                                  photo={m.isMe ? myPhoto : currentUser.data.photo}
                                                                  removeMessage={dialogsActions.removeMessage}
    />)

    return (
        <>
            {messagesElements}
            <MessageFormik activeDialog={activeDialog}
                           addMessage={dialogsActions.addMessage}/>
        </>
    )
}

export default MessageContainer
