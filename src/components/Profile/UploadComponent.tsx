import {Button, message, Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons'
import {profileAPI, ResultCodes} from '../../api/api'
import {useDispatch} from 'react-redux'
import {profileActions} from '../../redux/profile-reducer'
import {appActions} from '../../redux/app-reduces'
import React from 'react'

export const UploadComponent = (props: any) => {

    const dispatch = useDispatch()

    const onChange = (info: any) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`)
        }
    }

    const customRequest = async (options: any) => {
        try {
            const data = await profileAPI.updatePhoto(options)
            if (data?.resultCode === ResultCodes.Success) {
                dispatch(profileActions.setUserPhoto(data.data.photos))
            }
        } catch (error) {
            dispatch(appActions.setGlobalError(`Update user photo error: ${error.message}`))
            dispatch(appActions.setIsVisibleGlobalError(true))
        }
    }

    return (
        <Upload accept="image/*"
                onChange={onChange}
                customRequest={customRequest}
                showUploadList={false}
                {...props}
        >
            <Button icon={<UploadOutlined/>}>Загрузить фотографию</Button>
        </Upload>
    )
}

