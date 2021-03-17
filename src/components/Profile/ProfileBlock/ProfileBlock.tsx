import React from 'react'
import s from '../Profile.module.scss'
import {ProfileStatus} from './ProfileStatus'
import {ContactsType, ProfileType} from '../../../types/types'
import {useSelector} from 'react-redux'
import {getStatus} from '../../../redux/profile-selectors'
import {Col, Row} from 'antd'

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
            <Row className={s.profileInfoSection}>
                <Col flex='auto'>
                    <span><b>{profile.fullName}</b></span>
                    <ProfileStatus ownProfile={ownProfile}
                                   status={status}
                    />
                </Col>
            </Row>
            <div className={s.profileInfoSection}>
                <Row>
                    <Col flex={'180px'}>
                        <b>Обо мне:</b>
                    </Col>
                    <Col>
                        {profile.aboutMe}
                    </Col>
                </Row>
                <Row>
                    <Col flex={'180px'}>
                        <b>В поисках работы:</b>
                    </Col>
                    <Col>
                        {profile.lookingForAJob ? 'YES' : 'NO'}
                    </Col>
                </Row>
                <Row>
                    <Col flex={'180px'}>
                        <b>Статус поиска работы:</b>
                    </Col>
                    <Col>
                        {profile.lookingForAJobDescription}
                    </Col>
                </Row>
            </div>
            <div className={s.profileInfoSection}>
                <b>Контакты:</b>
                <div className={s.contactContainer}>
                    {Object.keys(profile.contacts).map((contact) => {
                        return <Contacts key={contact} contactValue={profile.contacts[contact as keyof ContactsType]}/>
                    })}
                </div>
            </div>
        </>
    )
}

type ContactsComponentType = {
    contactValue: string
}
const Contacts: React.FC<ContactsComponentType> = ({
                                                       contactValue
                                                   }) => {

    return (
        contactValue ? <div className={s.contactItem}>
            <a href={contactValue} className={s.contactLink}>{contactValue}</a>
        </div> : null

    )
}

