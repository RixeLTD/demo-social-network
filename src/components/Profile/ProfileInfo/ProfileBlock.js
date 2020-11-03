import React from 'react';
import classes from "./ProfileInfo.module.css";

const ProfileBlock = (props) => {

    return (
        <div>
            <div><b>Имя:</b> {props.profile.fullName}</div>
            <div><b>About me:</b>{props.profile.aboutMe}</div>
            <div>
                <div>
                    <span><b>В поисках работы:</b> </span>{props.profile.lookingForAJob ? 'YES' : 'NO'}
                </div>
                { props.profile.lookingForAJob &&
                <div>
                    <span><b>Статус поиска работы:</b> </span>{props.profile.lookingForAJobDescription}
                </div>
                }
            </div>
            <div>
                <div><b>Контакты:</b> {Object.keys(props.profile.contacts).map(key => {
                    return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                })}</div>
            </div>
            {props.ownProfile
                ? <button onClick={props.enableEditMode}>Edit profile</button> : null}
        </div>
    )
}

const Contacts = (props) => {

    return (
        props.contactValue ? <div className={classes.contactValue}>
                <b>{props.contactTitle}:</b><span>{props.contactValue}</span>
            </div> : null

    )
}

export default ProfileBlock