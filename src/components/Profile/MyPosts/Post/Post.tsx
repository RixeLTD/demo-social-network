import React, {useState} from 'react'
import s from '../../Profile.module.scss'
import noImage from '../../../../assets/images/noImage.png'
import {useDispatch} from 'react-redux'
import {profileActions} from '../../../../redux/profile-reducer'
import {Avatar, Tooltip} from 'antd'
import {CloseCircleFilled, CloseOutlined, HeartTwoTone} from '@ant-design/icons'

type PropsType = {
    message: string
    likesCount: number
    id: number
    photo: string | null
    userName: string
}
const Post: React.FC<PropsType> = ({
                                       message,
                                       likesCount,
                                       id,
                                       photo,
                                       userName,
                                   }) => {
    const dispatch = useDispatch()

    const [count, setCount] = useState(likesCount)
    const [isLiked, setIsLiked] = useState(false)
    const [mouseEnter, setMouseEnter] = useState(false)

    const onMouseEnter = () => {
        setMouseEnter(true)
    }
    const onMouseLeave = () => {
        setMouseEnter(false)
    }
    const onClick = () => {
        if (isLiked) {
            setCount(count - 1)
            setIsLiked(false)
        } else {
            setCount(count + 1)
            setIsLiked(true)
        }
    }

    const removePost = () => {
        dispatch(profileActions.removePost(id))
    }

    return (
        <div className={s.profileInfoSection}>
            <div className={s.postPhotoAndName}>
                <Avatar src={photo || noImage}/>
                <div className={s.postUserName}>{userName}</div>
                <Tooltip key="remove post" title={'Remove post'}>
                    <div className={s.removePost} onClick={removePost} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        {mouseEnter ? <CloseCircleFilled/> : <CloseOutlined/>}
                    </div>
                </Tooltip>
            </div>
            <div className={s.postText}>{message}</div>
            <Tooltip key="like" title={isLiked ? 'Remove Like' : 'Like'}>
                    <span onClick={onClick}>
                        <HeartTwoTone twoToneColor={isLiked ? '#eb2f96' : ''}/>
                        <span> {count}</span>
                    </span>
            </Tooltip>
        </div>
    )
}

export default Post