import React, {useEffect, useState} from 'react';
import s from './App.module.scss';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import {Route, Redirect, Switch} from "react-router-dom";
import Dialogs from "./components/Dialogs/Dialogs";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, ConnectedProps} from "react-redux";
import {initializeApp} from "./redux/app-reduces";
import Preloader from "./components/common/preloader/Preloader";
import GlobalError from "./utils/GlobalError/GlobalError";
import {getProfile} from "./redux/profile-selectors";
import {AppStateType} from "./redux/redux-store";

const App: React.FC<PropsFromRedux> = ({
                                           initializeApp,
                                           initialized,
                                           globalError
}) => {

    let [mobileNav, setMobileNav] = useState(false);

    useEffect(() => {
        initializeApp();
    }, [initializeApp])

    if (!initialized) {
        if (globalError) {
            return <GlobalError />
        }
        return <Preloader/>
    }

    return (
        <div className={s.mainContainer}>
            <header className={s.header}>
                <HeaderContainer setMobileNav={setMobileNav}
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
                            <ProfileContainer/>
                        </Route>
                        <Route path="/dialogs/:userId?">
                            <Dialogs/>
                        </Route>
                        <Route path="/users">
                            <UsersContainer/>
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
    );

}

const mapStateToProps = (state: AppStateType) => {
    return {
        initialized: state.app.initialized,
        globalError: state.app.globalError,
        profile: getProfile(state)
    }
}

const mapDispatchToProps = {
    initializeApp,
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(App);