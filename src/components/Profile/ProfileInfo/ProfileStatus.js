import React, {useEffect, useState} from 'react';

const ProfileStatus = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onChangeStatus = (event) => {
        setStatus(event.target.value);
    }

    return (
        <>
            {!editMode
                ? <div>
                    <span onDoubleClick={props.authUserId === props.profileId ?  activateEditMode : ""}>Статус: {status}</span>
                </div>
                : <div>
                    <span>Статус: </span><input autoFocus={true}
                                                onBlur={deactivateEditMode}
                                                value={status}
                                                onChange={onChangeStatus} />
                </div>
            }
        </>
    )
}

export default ProfileStatus;