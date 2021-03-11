import React, {useState} from 'react'
import s from '../../Profile.module.scss'
import noImage from '../../../../assets/images/noImage.png'
import {useDispatch} from 'react-redux'
import {profileActions} from '../../../../redux/profile-reducer'


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

    let [count, setCount] = useState(likesCount)
    let [isLiked, setIsLiked] = useState(false)

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
                <div className={s.postPhotoContainer}>
                    <img className={s.postPhoto} src={photo || noImage} alt=""/>
                </div>
                <div className={s.postUserName}>{userName}</div>
                <div className={s.removePost} onClick={removePost}>X
                </div>
            </div>
            <div className={s.postText}>{message}</div>
            <div className={s.heartContainer}>
                <div className={`${s.heart} ${isLiked ? s.heartLiked : null}`} onClick={onClick}>
                    <span className={s.likesCount}>{count}</span>
                </div>
            </div>
        </div>
    )
}

export default Post