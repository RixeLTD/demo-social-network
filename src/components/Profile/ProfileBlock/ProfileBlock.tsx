import React from 'react';
import s from "../Profile.module.scss";
import {ProfileStatus} from "./ProfileStatus";
import {ContactsType, ProfileType} from "../../../types/types";
import {useSelector} from 'react-redux'
import {getStatus} from '../../../redux/profile-selectors'

type ProfileBlockType = {
    profile: ProfileType
    ownProfile: boolean
}
export const ProfileBlock: React.FC<ProfileBlockType> = ({
                          profile,
                          ownProfile,
                      }) => {
    const status = useSelector(getStatus)

    return (
        <>
            <div className={s.profileInfoSection}>
                <div className={s.item}>
                    <div className={s.itemKey}>Имя:</div>
                    <span className={s.itemValue}>{profile.fullName}</span>
                </div>
                <ProfileStatus ownProfile={ownProfile}
                               status={status}
                />
            </div>
            <div className={s.profileInfoSection}>
                <div className={s.item}>
                    <div className={s.itemKey}>Обо мне:</div>
                    <span className={s.itemValue}>{profile.aboutMe}</span>
                </div>
                <div className={s.item}>
                    <div className={s.itemKey}>В поисках работы:</div>
                    <span className={s.itemValue}>{profile.lookingForAJob ? 'YES' : 'NO'}</span>
                </div>
                {profile.lookingForAJob &&
                <div className={s.item}>
                    <div className={s.itemKey}>Статус поиска работы:</div>
                    <span className={s.itemValue}>{profile.lookingForAJobDescription}</span>
                </div>
                }
            </div>
            <div className={s.profileInfoSection}>
                <div className={s.itemKey}>Контакты:</div>
                <div className={s.contactContainer}>
                    {Object.keys(profile.contacts).map((contact) => {
                        return <Contacts key={contact} contactTitle={contact} contactValue={profile.contacts[contact as keyof ContactsType]}/>
                    })}
                </div>
            </div>
        </>
    )
}

type ContactsComponentType = {
    contactTitle: string
    contactValue: string
}
const Contacts: React.FC<ContactsComponentType> = ({
                      contactTitle,
                      contactValue
                  }) => {

    return (
        contactValue ? <div className={s.contactItem}>
            <div className={s.contactKey}>{contactTitle}:</div>
            <a href={contactValue} className={s.contactLink}>{contactValue}</a>
        </div> : null

    )
}

