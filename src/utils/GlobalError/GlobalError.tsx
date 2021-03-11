import React from 'react'
import s from './GlobalError.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {appActions} from '../../redux/app-reduces'
import {getGlobalError, getIsVisibleGlobalError} from '../../redux/app-selectors'

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
            {isVisibleGlobalError ? <div className={s.modal}>
                <div className={s.text}>{globalError}</div>
                <button className={s.button} onClick={closeError}>X</button>
            </div> : null
            }
        </>
    )
}