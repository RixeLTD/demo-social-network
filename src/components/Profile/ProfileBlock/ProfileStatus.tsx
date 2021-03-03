import React, {ChangeEvent, useEffect, useState} from 'react';
import s from "../Profile.module.scss";

type Props = {
    ownProfile: boolean
    status: string
    updateUserStatus: (status: string) => void
}
const ProfileStatus: React.FC<Props> = ({
                                            status,
                                            updateUserStatus,
                                            ownProfile
                                        }) => {

    let [editMode, setEditMode] = useState(false);
    let [text, setText] = useState(status);

    useEffect(() => {
        setText(status);
    }, [status])

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        updateUserStatus(text);
    }

    const onChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    return (
        <>
            {!editMode
                ? <div className={s.status}>
                    <div className={s.statusValue}>{status}</div>
                    {ownProfile ?
                        <div><span className={s.changeStatus} onClick={activateEditMode}>изменить статус</span>
                        </div> : null}
                </div>
                : <>
                    <div className={s.search}>
                        <input
                            className={s.clearInputStyle}
                            autoFocus={true}
                            onBlur={deactivateEditMode}
                            value={text}
                            onChange={onChangeStatus}
                            onKeyUp={(event) => {
                                if (event.key === "Enter" || event.key === "Enter" || event.keyCode === 13) {
                                    deactivateEditMode()
                                }
                            }}
                        />

                    </div>
                </>
            }
        </>
    )
}

export default ProfileStatus;