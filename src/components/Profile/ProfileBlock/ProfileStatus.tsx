import React, {ChangeEvent, useEffect, useState} from 'react'
import s from '../Profile.module.scss'
import {useDispatch} from 'react-redux'
import {updateUserStatus} from '../../../redux/profile-reducer'
import {AutoSizeTextarea, AutoSizeTextareaProps} from '../../../utils/AutoSizeTextarea'
import {Button} from 'antd'

type Props = {
    ownProfile: boolean
    status: string
}
export const ProfileStatus: React.FC<Props> = ({
                                                   status,
                                                   ownProfile
                                               }) => {

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(status)
    const dispatch = useDispatch()

    useEffect(() => {
        setText(status)
    }, [status])

    const onChangeStatus = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
    }
    const updateStatus = () => {
        setEditMode(false)
        dispatch(updateUserStatus(text))
    }

    const sharedProps: AutoSizeTextareaProps = {
        autoSize: true,
        onChange: onChangeStatus,
        value: text,
        focus: {cursor: 'end'},
        onBlur: () => {
            setEditMode(false)
        },
        onPressEnter: updateStatus,
        style: {margin: '10px auto'},
        onKeyUp: (event) => {
            if (event.key === 'Esc' || event.key === 'Esc' || event.keyCode === 27) {
                setEditMode(false)
            }
        },
        maxLength: 300
    }

    return (
        <>
            {!editMode
                ? <>
                    <div>{status}</div>
                    {ownProfile ?
                        <span className={s.changeStatus} onClick={() => {
                            setEditMode(true)
                        }}>изменить статус</span>
                        : null}
                </>
                : <>
                    <AutoSizeTextarea sharedProps={sharedProps}/>
                    <Button type='primary' onClick={updateStatus}>Сохранить</Button>
                </>
            }
        </>
    )
}

