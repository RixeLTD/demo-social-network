import React, {useEffect, useState} from 'react';
import classes from './ProfileInfo.module.css';
import ProfileStatus from "./ProfileStatus";
import noImage from "./../../../assets/images/noImage.png"
import ProfileBlockForm from "./ProfileBlockForm";
import ProfileBlock from "./ProfileBlock";
import GlobalError from '../../common/GlobalError/GlobalError';

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [errorMessage, setErrorMessage] = useState(props.errorMessage);

    useEffect( () => {
        setErrorMessage(props.errorMessage);
    }, [props.errorMessage]);

    const enableEditMode = () => {
        setErrorMessage(null);
        setEditMode(true);
    }

    const disableEditMode = () => {
        setEditMode(false);
    }

    const ownProfile = props.authUserId === props.profile.userId;

    return (
        <div className={classes.descriptionBlock}>
            <div>
                <img className={classes.userImage} src={props.profile.photos.large || noImage} alt=""/>
                {ownProfile
                    ? <div>
                        <input id={'file'} type={'file'} onChange={props.onUpdateUserPhoto}/>
                    </div> : null}
                <ProfileStatus authUserId={props.authUserId} profileId={props.profile.userId} status={props.status}
                               updateUserStatus={props.updateUserStatus}/>
            </div>
            {editMode
            ? <ProfileBlockForm disableEditMode={disableEditMode}
                                profile={props.profile}
                                submitUpdateProfile={props.submitUpdateProfile}
                                errorMessage={errorMessage}
                                isSubmittingSuccess={props.isSubmittingSuccess}/>
            : <ProfileBlock profile={props.profile}
                            ownProfile={ownProfile}
                            enableEditMode={enableEditMode}/>
            }
        </div>
    )
}


export default ProfileInfo;
