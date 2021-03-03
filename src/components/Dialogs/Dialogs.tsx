import React, {useEffect, useState} from 'react'
import {dialogsActions, DialogElementType} from "../../redux/dialogs-reducer"
import {connect, ConnectedProps} from "react-redux"
import {withAuthRedirect} from "../../hoc/withAuthRedirect"
import {RouteComponentProps, withRouter} from "react-router-dom"
import s from "./Dialogs.module.scss"
import MessageContainer from "./Message/MessageContainer"
import DialogItemContainer from "./DialogItem/DialogItemContainer"
import {AppStateType} from "../../redux/redux-store"

type RouterProps = { // type for `match.params`
    userId: string // must be type `string` since value comes from the URL
}
type OwnPropsType = RouteComponentProps<RouterProps>
type PropsType = PropsFromRedux & OwnPropsType
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
            const user = dialogs.find((u: DialogElementType) => u.data.userId === userId)
            if (user) {
                setCurrentUser(user)
            }
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

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.messagesPage.dialogs,
        myPhoto: state.me.photo,
        myName: state.me.fullName,
    }
}

const mapDispatchToProps = {
    addMessage: dialogsActions.addMessage,
    removeMessage: dialogsActions.removeMessage
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default withRouter(withAuthRedirect(connector(Dialogs)))