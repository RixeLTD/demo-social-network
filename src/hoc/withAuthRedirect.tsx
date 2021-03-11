import React from 'react'
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getIsAuth} from '../redux/auth-selectors'

export function withAuthRedirect<P>(Component: React.ComponentType<P>) {

    const RedirectComponent: React.FC = ({...props}) => {

        const isAuth = useSelector(getIsAuth)

        if (!isAuth) return <Redirect to={'/login/'}/>

        return <Component {...props as P}/>
    }

    return RedirectComponent
}