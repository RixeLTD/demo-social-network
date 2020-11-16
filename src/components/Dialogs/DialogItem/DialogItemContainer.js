import React from 'react';
import DialogItem from "./DialogItem";

const DialogItemContainer = ({match, messages, findText, myPhoto, filteredUsers, myName, ...props}) => {

    let dialogsElements = filteredUsers.map(d => <DialogItem userId={d.userId}
                                                             userName={d.userName}
                                                             photo={d.photo}
                                                             myPhoto={myPhoto}
                                                             messages={d.messages}
                                                             key={d.userId}
                                                             match={match}
                                                             findText={findText}
    />);

    return (
        <>
            {dialogsElements.reverse()}
        </>
    );
}

export default DialogItemContainer;