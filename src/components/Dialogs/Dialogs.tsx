import React, {useEffect, useState} from 'react'
import {DialogElementType} from '../../redux/dialogs-reducer'
import {useSelector} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import s from './Dialogs.module.scss'
import MessageContainer from './Message/MessageContainer'
import DialogItemContainer from './DialogItem/DialogItemContainer'
import {getDialogs} from '../../redux/dialogs-selectors'
import {getMyName, getMyPhoto} from '../../redux/auth-selectors'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'

const Dialogs: React.FC<RouteComponentProps<{ userId: string }>> = ({match}) => {

    const dialogs = useSelector(getDialogs)
    const myPhoto = useSelector(getMyPhoto)
    const myName = useSelector(getMyName)

    let [activeDialog, setActiveDialog] = useState<number | null>(null)
    let [currentUser, setCurrentUser] = useState<DialogElementType | null>(null)

    useEffect(() => {
        window.scrollTo({top: 0})
    }, [])

    useEffect(() => {
        let userId: number = +match.params.userId
        if (userId) {
            setActiveDialog(userId)
            const user = dialogs.find((u: DialogElementType) => u.data.userId === userId)
            if (user) {
                setCurrentUser(user)
            }
        } else {
            setActiveDialog(null)
            setCurrentUser(null)
        }
    }, [activeDialog, match.params.userId, dialogs])

    if (activeDialog) {
        return (
            <div className={s.container}>
                <MessageContainer myPhoto={myPhoto}
                                  myName={myName}
                                  activeDialog={activeDialog}
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

export default withRouter(withAuthRedirect(Dialogs))