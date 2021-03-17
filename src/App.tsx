import React, {useEffect, useState} from 'react'
import './index.scss'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import {Users} from './components/Users/Users'
import {Redirect, Route, Switch} from 'react-router-dom'
import Dialogs from './components/Dialogs/Dialogs'
import {AppHeader} from './components/Header/AppHeader'
import {Login} from './components/Login/Login'
import {useDispatch, useSelector} from 'react-redux'
import {initializeApp} from './redux/app-reduces'
import {Preloader} from './components/common/preloader/Preloader'
import {GlobalError} from './utils/GlobalError'
import {getCurrentPage, getPageSize} from './redux/users-selectors'
import {requestUsers} from './redux/users-reduces'
import {getGlobalError, getInitialized} from './redux/app-selectors'
import {BackTop, Layout} from 'antd'
import 'antd/dist/antd.css'

export const App: React.FC = () => {
    const initialized = useSelector(getInitialized)
    const globalError = useSelector(getGlobalError)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false)
    const [style, setStyle] = useState({})
    const {Header, Content, Sider} = Layout

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize))
        dispatch(initializeApp())
    }, [])

    if (!initialized) {
        if (globalError) {
            return <GlobalError/>
        }
        return <Preloader/>
    }
    return (
        <>
            <Layout>
                <BackTop duration={200}/>
                <Header style={{padding: '0 10px'}}>
                    <AppHeader/>
                </Header>
                <Layout>
                    <Sider width={180}
                           breakpoint={'md'}
                           collapsedWidth={'0'}
                           onBreakpoint={(b) => {
                               setStyle(b ? {position: 'absolute', zIndex: 10} : {})
                           }}
                           zeroWidthTriggerStyle={{
                               top: 3
                           }}
                           style={style && {background: '#f0f2f5'}}
                           collapsed={collapsed}
                           onCollapse={(value) => {
                               setCollapsed(value)
                           }}
                    >
                        <Navbar setCollapsed={setCollapsed}/>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Content
                            style={{
                                paddingTop: '24px',
                                margin: 0,
                                minHeight: 300
                            }}
                        >
                            <Switch>
                                <Route path="/" exact>
                                    <Redirect to="/profile"/>
                                </Route>
                                <Route path="/profile/:userId?">
                                    <Profile/>
                                </Route>
                                <Route path="/dialogs/:userId?">
                                    <Dialogs/>
                                </Route>
                                <Route path="/users">
                                    <Users/>
                                </Route>
                                <Route path="/login">
                                    <Login/>
                                </Route>
                                <Route path="*">
                                    <div>404 Not Found</div>
                                </Route>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
                <GlobalError/>
            </Layout>
        </>
    )
}