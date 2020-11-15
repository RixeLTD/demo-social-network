import React, {useEffect, useState} from 'react';
import MyPosts from "./MyPosts/MyPosts";
import s from './Profile.module.scss';
import noImage from "../../assets/images/noImage.png";
import ProfileBlockForm from "./ProfileBlock/ProfileBlockForm";
import ProfileBlock from "./ProfileBlock/ProfileBlock";

const Profile = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [errorMessage, setErrorMessage] = useState(props.errorMessage);

    useEffect(() => {
        setErrorMessage(props.errorMessage);
    }, [props.errorMessage]);

    const enableEditMode = () => {
        setErrorMessage(null);
        setEditMode(true);
    }

    const disableEditMode = () => {
        setEditMode(false);
    }

    return (
        <div className={s.profileBlock}>
            <div className={s.profileImageContainer}>
                <div className={s.profileImageBlock}>
                    <img className={s.userImage} src={props.profile.photos.large || noImage}
                         alt=""/>
                    {props.ownProfile
                        ? <div>
                            <label className={s.uploadPhoto}>Загрузить фотографию
                                <input id={'file'} type={'file'} onChange={props.onUpdateUserPhoto} accept="image/*"
                                       hidden/>
                            </label>
                            {
                                editMode
                                    ?
                                    <div className={s.editProfile} onClick={disableEditMode}>Отмена</div>
                                    :
                                    <div className={s.editProfile} onClick={enableEditMode}>Редактировать профиль</div>
                            }
                        </div> : null
                    }

                </div>
            </div>
            <div className={s.profileInfoContainer}>
                {editMode
                    ? <ProfileBlockForm disableEditMode={disableEditMode}
                                        profile={props.profile}
                                        submitUpdateProfile={props.submitUpdateProfile}
                                        errorMessage={errorMessage}
                                        isSubmittingSuccess={props.isSubmittingSuccess}/>
                    : <ProfileBlock profile={props.profile}
                                    ownProfile={props.ownProfile}
                                    status={props.status}
                                    updateUserStatus={props.updateUserStatus}
                                    enableEditMode={enableEditMode}/>
                }
                <MyPosts ownProfile={props.ownProfile}
                         posts={props.posts}
                         addPost={props.addPost}
                         photo={props.profile.photos.small}
                         userName={props.profile.fullName}
                         removePost={props.removePost}/>
            </div>
        </div>
    )
}

export default Profile;