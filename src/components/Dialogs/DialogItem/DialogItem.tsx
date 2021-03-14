import React from 'react'
import s from '../Dialogs.module.scss'
import {Link} from 'react-router-dom'
import noImage from '../../../assets/images/noImage.png'
import {UserMessagesType} from '../../../redux/dialogs-reducer'
import {Avatar, Col, Row} from 'antd'

type PropsType = {
    userId: number
    userName: string
    photo: string
    myPhoto: string | null
    messages: Array<UserMessagesType>
}
const DialogItem: React.FC<PropsType> = ({messages, photo, userId, userName, myPhoto}) => {

    let isMe: boolean = false
    let message: string = ''

    if (messages && messages.length !== 0) {
        isMe = messages[messages.length - 1]['isMe']
        message = messages[messages.length - 1]['message']
    }

    return (
        <Link to={`/dialogs/${userId}`} className={s.link}>
            <Row wrap={false} className={s.block}>
                <Col flex='none'>
                    <Avatar src={photo} size='large'/>
                </Col>
                <Col flex='auto' className={s.userNameAndMessage}>
                    <div className={s.userName}>{userName}</div>
                    <Row className={s.messageContainer} wrap={false}>
                        <Col>
                            {isMe ? <Avatar style={{marginRight: 8}} size='small' src={myPhoto || noImage}/> : null}
                        </Col>
                        <Col>
                            {message}
                        </Col>

                    </Row>
                </Col>
            </Row>
        </Link>
    )
}

export default DialogItem