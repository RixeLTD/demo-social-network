import React from 'react';
import s from "../Profile.module.scss";
import ProfileStatus from "./ProfileStatus";

const ProfileBlock = (props) => {

    return (
        <>
            <div className={s.profileInfoSection}>
                <div className={s.item}>
                    <div className={s.itemKey}>Имя:</div>
                    <span>{props.profile.fullName}</span>
                </div>
                <ProfileStatus ownProfile={props.ownProfile} status={props.status}
                               updateUserStatus={props.updateUserStatus}/>
            </div>
            <div className={s.profileInfoSection}>
                <div className={s.item}>
                    <div className={s.itemKey}>Обо мне:</div>
                    <span>{props.profile.aboutMe}</span>
                </div>
                <div className={s.item}>
                    <div className={s.itemKey}>В поисках работы:</div>
                    <span>{props.profile.lookingForAJob ? 'YES' : 'NO'}</span>
                </div>
                {props.profile.lookingForAJob &&
                <div className={s.item}>
                    <div className={s.itemKey}>Статус поиска работы:</div>
                    {props.profile.lookingForAJobDescription}
                </div>
                }
            </div>
            <div className={s.profileInfoSection}>
                <div className={s.itemKey}>Контакты:</div>
                <div className={s.contactContainer}>
                    {Object.keys(props.profile.contacts).map(key => {
                        return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                    })}
                </div>
            </div>
        </>
    )
}

const Contacts = (props) => {

    return (
        props.contactValue ? <div className={s.contactItem}>
            <div className={s.contactKey}>{props.contactTitle}:</div>
            <a href={props.contactValue} className={s.contactLink}>{props.contactValue}</a>
        </div> : null

    )
}

export default ProfileBlock