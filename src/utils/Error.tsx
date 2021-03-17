import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {message} from 'antd'

type Props = {
    action: any
    errorMessage: string | null
}
export const Error = ({errorMessage, action}: Props) => {

    const dispatch = useDispatch()

    const error = () => {
        message.error(errorMessage, 3, () => {dispatch(action)})
    }

    useEffect(() => {
        if (errorMessage) {
            error()
        }
    }, [errorMessage])
    return <></>
}