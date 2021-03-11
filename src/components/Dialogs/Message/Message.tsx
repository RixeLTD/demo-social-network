import React from 'react'
import s from './Message.module.scss'
import noImage from '../../../assets/images/noImage.png'
import {useDispatch} from 'react-redux'

type PropsType = {
    message: string
    activeDialog: number
    messageId: number
    userName: string | null
    photo: string | null
    removeMessage: (activeDialog: number, id: number) => void
}
export const Message: React.FC<PropsType> = ({
                     message,
                     removeMessage,
                     activeDialog,
                     messageId,
                     userName,
                     photo
                 }) => {
    const dispatch = useDispatch()
    return (
        <div className={s.block}>
            <div>
                <div className={s.photoContainer}>
                    <img className={s.photo} src={photo || noImage} alt=""/>
                </div>
            </div>
            <div className={s.userNameAndMessage}>
                <div className={s.userName}>{userName}</div>
                <div className={s.message}>{message}</div>
            </div>
            <div className={s.remove} onClick={() => {
                dispatch(removeMessage(activeDialog, messageId))
            }}>X
            </div>
        </div>
    )
}
