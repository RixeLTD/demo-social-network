import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {appActions} from '../redux/app-reduces'
import {getGlobalError, getIsVisibleGlobalError} from '../redux/app-selectors'
import { Alert } from 'antd'

export const GlobalError: React.FC = () => {
    const isVisibleGlobalError = useSelector(getIsVisibleGlobalError)
    const globalError = useSelector(getGlobalError)
    const dispatch = useDispatch()

    const closeError = () => {
        dispatch(appActions.setIsVisibleGlobalError(false))
        dispatch(appActions.setGlobalError(''))
    }

    return (
        <>
            {isVisibleGlobalError ?  <Alert
                message={globalError}
                onClose={closeError}
                type="error"
                showIcon
                closable
                style={{alignSelf: 'center', position: 'fixed', bottom: 50, zIndex: 10}}
            /> : null
            }
        </>
    )
}