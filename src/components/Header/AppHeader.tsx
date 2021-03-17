import React from 'react'
import {Link} from 'react-router-dom'
import logo from './../../logo.png'
import {useDispatch, useSelector} from 'react-redux'
import {getIsAuth, getMyName, selectIsFetching} from '../../redux/auth-selectors'
import {logoutUser} from '../../redux/auth-reduces'
import {Button, Col, Row} from 'antd'

export const AppHeader: React.FC = () => {
    const isAuth = useSelector(getIsAuth)
    const myName = useSelector(getMyName)
    const isFetching = useSelector(selectIsFetching)
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutUser())
    }

    return <>
        <Row wrap={false}>
            <Col flex='none'>
                <Link to={'/profile'}>
                    <img src={logo} style={{width: '30px'}} alt=''/>
                </Link>
            </Col>
            <Col flex='auto' style={{color: 'white', textAlign: 'right', fontSize: 16}}>
                {isAuth
                    ? <>
                        <span>{myName}&nbsp;&nbsp;</span>
                        <Button onClick={logout} loading={isFetching}>Выйти</Button>
                    </>
                    : <Button><Link to={'/login'}>Войти</Link></Button>}
            </Col>
        </Row>
    </>
}