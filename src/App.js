import React, {useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from './components/Users/UsersContainer';
import {Route, withRouter, Redirect, Switch} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reduces";
import Preloader from "./components/common/Preloader/Preloader";

const App = ({initializeApp, initialized}) => {

    useEffect(() => {
        initializeApp();
    }, [initializeApp])

    if (!initialized) {
        return <Preloader/>
    }

    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar />
            <div className='app-wrapper-content'>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/profile" />
                    </Route>
                    <Route path="/profile/:userId?">
                        <ProfileContainer/>
                    </Route>
                    <Route path="/dialogs">
                        <DialogsContainer/>
                    </Route>
                    <Route path="/users">
                        <UsersContainer/>
                    </Route>
                    <Route path="/settings">
                        <Settings/>
                    </Route>
                    <Route path="/news">
                        <News/>
                    </Route>
                    <Route path="/music">
                        <Music/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="*">
                        <div>404 Not Found</div>
                    </Route>
                </Switch>

            </div>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
    }
}

const mapDispatchToProps = {
    initializeApp,
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(App);