import React, {useState} from 'react';
import s from "../../Profile.module.scss";
import noImage from "../../../../assets/images/noImage.png";

const Post = (props) => {

    let [count, setCount] = useState(props.likesCount);
    let [isLiked, setIsLiked] = useState(false);

    const onClick = () => {
        if (isLiked) {
            setCount(count - 1);
            setIsLiked(false);
        } else {
            setCount(count + 1);
            setIsLiked(true);
        }
    }

    const removePost = () => {
        props.removePost(props.id);
    }

    return (
        <div className={s.profileInfoSection}>
                <div className={s.postPhotoAndName}>
                    <div className={s.postPhotoContainer}>
                        <img className={s.postPhoto} src={props.photo || noImage} alt=""/>
                    </div>
                    <div className={s.postUserName}>{props.userName}</div>
                    <div className={s.removePost} onClick={removePost}>X</div>
                </div>
            <div className={s.postText}>{props.message}</div>
            <div className={s.heartContainer}>
                <div className={`${s.heart} ${isLiked ? s.heartLiked : null}`} onClick={onClick}>
                    <span className={s.likesCount}>{count}</span>
                </div>
            </div>
        </div>
    );
}

export default Post;