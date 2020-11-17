import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logoutUser} from "../../redux/auth-reduces";

const HeaderContainer = (props) => {

        return (
            <Header isAuth={props.isAuth}
                    fullName={props.fullName}
                    logoutUser={props.logoutUser}
                    setMobileNav={props.setMobileNav}
                    mobileNav={props.mobileNav}
            />
        )
}

let mapStateToProps = (state) => {

    return {
        isAuth: state.auth.isAuth,
        fullName: state.auth.fullName,
    }
};

let mapDispatchToProps = {
    logoutUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);