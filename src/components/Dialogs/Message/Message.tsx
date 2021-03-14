import React, {useState} from 'react'
import s from './Message.module.scss'
import noImage from '../../../assets/images/noImage.png'
import {useDispatch} from 'react-redux'
import {Avatar, Col, Row, Tooltip} from 'antd'
import {dialogsActions} from '../../../redux/dialogs-reducer'
import {CloseCircleFilled, CloseOutlined} from '@ant-design/icons'

type PropsType = {
    message: string
    activeDialog: number
    messageId: number
    userName: string | null
    photo: string | null
}
export const Message: React.FC<PropsType> = ({
                                                 message,
                                                 activeDialog,
                                                 messageId,
                                                 userName,
                                                 photo
                                             }) => {
    const dispatch = useDispatch()
    const [mouseEnter, setMouseEnter] = useState(false)

    const onMouseEnter = () => {
        setMouseEnter(true)
    }
    const onMouseLeave = () => {
        setMouseEnter(false)
    }
    const removeMessage = () => {
        dispatch(dialogsActions.removeMessage(activeDialog, messageId))
    }

    return (
        <Row wrap={false} className={s.block}>
            <Col flex='none'>
                <Avatar src={photo || noImage}/>
            </Col>
            <Col flex='auto' className={s.userNameAndMessage}>
                <div className={s.userName}>{userName}</div>
                <div>{message}</div>
            </Col>
            <Tooltip key="remove message" title={'Remove message'}>
                <div className={s.removeMessage} onClick={removeMessage} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    {mouseEnter ? <CloseCircleFilled/> : <CloseOutlined/>}
                </div>
            </Tooltip>
        </Row>
    )
}
