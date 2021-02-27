import React, {useEffect, useState} from 'react';
import {addMessage, DialogElementType, removeMessage} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import s from "./Dialogs.module.scss";
import MessageContainer from "./Message/MessageContainer";
import DialogItemContainer from "./DialogItem/DialogItemContainer";
import {AppStateType} from "../../redux/redux-store";

type RouterProps = { // type for `match.params`
    userId: string // must be type `string` since value comes from the URL
}
type MapStateType = {
    dialogs: Array<DialogElementType>
    myPhoto: string | null
    myName: string | null
}
type MapDispatchType = {
    addMessage: (message: string, activeDialog: number) => void
    removeMessage: (activeDialog: number, messageId: number) => void
}
type OwnPropsType = RouteComponentProps<RouterProps>
type PropsType = MapStateType & MapDispatchType & OwnPropsType
const Dialogs: React.FC<PropsType> = ({
                     match,
                     dialogs,
                     myPhoto,
                     myName,
                     addMessage,
                     removeMessage
}) => {

    let [activeDialog, setActiveDialog] = useState<number | null>(null)
    let [currentUser, setCurrentUser] = useState<DialogElementType | null>(null)

    useEffect(() => {
        let userId: number = +match.params.userId
        if (userId) {
            setActiveDialog(userId);
            setCurrentUser(dialogs.find(u => u.data.userId === userId) as DialogElementType)
        } else {
            setActiveDialog(null);
            setCurrentUser(null);
        }
    }, [activeDialog, match.params.userId, dialogs]);

    if (activeDialog) {
        return (
            <div className={s.container}>
                <MessageContainer myPhoto={myPhoto}
                                  myName={myName}
                                  activeDialog={activeDialog}
                                  addMessage={addMessage}
                                  removeMessage={removeMessage}
                                  currentUser={currentUser}
                />
            </div>
        )
    }

    return (
        <>
            <div className={s.container}>
                <DialogItemContainer myPhoto={myPhoto}
                                     dialogs={dialogs}
                />
            </div>
        </>
    )
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        dialogs: state.messagesPage.dialogs,
        myPhoto: state.me.photo,
        myName: state.me.fullName,
    }
}

const mapDispatchToProps = {
    addMessage,
    removeMessage
}

export default compose(
    connect<MapStateType, MapDispatchType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(Dialogs)