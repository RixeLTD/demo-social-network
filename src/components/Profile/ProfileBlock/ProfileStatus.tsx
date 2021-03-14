import React, {ChangeEvent, useEffect, useState} from 'react'
import s from '../Profile.module.scss'
import {useDispatch} from 'react-redux'
import {updateUserStatus} from '../../../redux/profile-reducer'

type Props = {
    ownProfile: boolean
    status: string
}
export const ProfileStatus: React.FC<Props> = ({
                                                   status,
                                                   ownProfile
                                               }) => {
    const dispatch = useDispatch()

    let [editMode, setEditMode] = useState(false)
    let [text, setText] = useState(status)

    useEffect(() => {
        setText(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateUserStatus(text))
    }

    const onChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    return (
        <>
            {!editMode
                ? <>
                    <div>{status}</div>
                    {ownProfile ?
                        <span className={s.changeStatus} onClick={activateEditMode}>изменить статус</span>
                        : null}
                </>
                : <>
                    <input
                        className={s.clearInputStyle}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={text}
                        onChange={onChangeStatus}
                        onKeyUp={(event) => {
                            if (event.key === 'Enter' || event.key === 'Enter' || event.keyCode === 13) {
                                deactivateEditMode()
                            }
                        }}
                    />
                </>
            }
        </>
    )
}

