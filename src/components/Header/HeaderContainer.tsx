import React from 'react';
import Header from "./Header";
import {connect, ConnectedProps} from "react-redux";
import {logoutUser} from "../../redux/auth-reduces";
import {AppStateType} from "../../redux/redux-store";

type OwnProps = {
    mobileNav: boolean
    setMobileNav: (value: boolean) => void
}
type PropsType = PropsFromRedux & OwnProps
const HeaderContainer: React.FC<PropsType> = ({
                                                  isAuth,
                                                  fullName,
                                                  logoutUser,
                                                  setMobileNav,
                                                  mobileNav,
                                              }) => {

        return (
            <Header isAuth={isAuth}
                    fullName={fullName}
                    logoutUser={logoutUser}
                    setMobileNav={setMobileNav}
                    mobileNav={mobileNav}
            />
        )
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.me.isAuth,
        fullName: state.me.fullName,
    }
};

let mapDispatchToProps = {
    logoutUser
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(HeaderContainer)