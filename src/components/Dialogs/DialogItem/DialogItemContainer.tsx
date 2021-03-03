import React from 'react';
import DialogItem from "./DialogItem";
import {DialogElementType} from "../../../redux/dialogs-reducer";

type PropsType = {
    dialogs: Array<DialogElementType>
    myPhoto: string | null
}
const DialogItemContainer: React.FC<PropsType> = ({myPhoto, dialogs}) => {

    let dialogsElements = dialogs.map(u => <DialogItem userId={u.data.userId}
                                                       userName={u.data.userName}
                                                       photo={u.data.photo}
                                                       myPhoto={myPhoto}
                                                       messages={u.messages}
                                                       key={u.data.userId}
    />)
    return (
        <>
            {dialogsElements.reverse()}
        </>
    );
}

export default DialogItemContainer