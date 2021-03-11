import React, {useEffect, useState} from 'react'
import s from './App.module.scss'
import {Navbar} from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import {Users} from './components/Users/Users'
import {Redirect, Route, Switch} from 'react-router-dom'
import Dialogs from './components/Dialogs/Dialogs'
import {Header} from './components/Header/Header'
import {Login} from './components/Login/Login'
import {useDispatch, useSelector} from 'react-redux'
import {initializeApp} from './redux/app-reduces'
import {Preloader} from './components/common/preloader/Preloader'
import {GlobalError} from './utils/GlobalError/GlobalError'
import {getCurrentPage, getPageSize} from './redux/users-selectors'
import {requestUsers} from './redux/users-reduces'
import {getGlobalError, getInitialized} from './redux/app-selectors'

export const App: React.FC = () => {
    const initialized = useSelector(getInitialized)
    const globalError = useSelector(getGlobalError)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const dispatch = useDispatch()

    let [mobileNav, setMobileNav] = useState(false)

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
        <div className={s.mainContainer}>
            <header className={s.header}>
                <Header setMobileNav={setMobileNav}
                        mobileNav={mobileNav}/>
            </header>
            <div className={s.mainBlock}>
                <nav className={`${s.nav} ${mobileNav ? s.navVisible : null}`}>
                    <Navbar setMobileNav={setMobileNav}/>
                </nav>
                <main className={s.content}>
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
                </main>
            </div>
            <GlobalError/>
        </div>
    )
}