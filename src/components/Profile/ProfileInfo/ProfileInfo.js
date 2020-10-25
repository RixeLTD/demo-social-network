import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/preloader";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    let contacts = props.profile.contacts;
    let facebook = contacts.facebook ? <span>facebook: {contacts.facebook}<br/></span> : null;
    let website = contacts.website ? <span>website: {contacts.website}<br/></span> : null;
    let vk = contacts.vk ? <span>vk: {contacts.vk}<br/></span> : null;
    let twitter = contacts.twitter ? <span>twitter: {contacts.twitter}<br/></span> : null;
    let instagram = contacts.instagram ? <span>instagram: {contacts.instagram}<br/></span> : null;
    let youtube = contacts.youtube ? <span>youtube: {contacts.youtube}<br/></span> : null;
    let github = contacts.github ? <span>github: {contacts.github}<br/></span> : null;
    let mainLink = contacts.mainLink ? <span>mainLink: {contacts.mainLink}<br/></span> : null;

    return (
        <div>
            {/*<div>*/}
            {/*    <img src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350' alt=''/>*/}
            {/*</div>*/}

            <div className={classes.descriptionBlock}>
                <div>
                    <div>БЛОК ФОТО И СТАТУС</div>
                    <img src={props.profile.photos.large} alt=""/>
                    <div>{props.profile.aboutMe}</div>
                    <ProfileStatus authUserId={props.authUserId} profileId={props.profile.userId} status={props.status} updateUserStatus={props.updateUserStatus}/>
                </div>
                <div>Имя: {props.profile.fullName}</div>
                <div>
                    <div>БЛОК КОНТАКТЫ</div>
                    {facebook}
                    {website}
                    {vk}
                    {twitter}
                    {instagram}
                    {youtube}
                    {github}
                    {mainLink}
                </div>
                <div>БЛОК ПОИСК РАБОТЫ
                    <div>
                        <span>В происках работы? : </span>{props.profile.lookingForAJob ? 'YES' :'NO'}
                    </div>
                    <div>
                        <span>Статус поиска работы : </span>{props.profile.lookingForAJobDescription}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;