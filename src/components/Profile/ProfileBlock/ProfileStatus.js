import React, {useEffect, useState} from 'react';
import s from "../Profile.module.scss";

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
                ? <div className={s.status}>
                    <div className={s.statusValue}>{props.status}</div>
                    {props.ownProfile ?
                        <div><span className={s.changeStatus} onClick={activateEditMode}>изменить статус</span>
                        </div> : null}
                </div>
                : <>
                    <div className={s.search}>
                        <input
                        className={s.clearInputStyle}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}
                        onChange={onChangeStatus}
                        onKeyUp={(event) => {
                            if(event.keyCode === 13){
                                deactivateEditMode()
                        }}}
                    />

                    </div>
                </>
            }
        </>
    )
}

export default ProfileStatus;