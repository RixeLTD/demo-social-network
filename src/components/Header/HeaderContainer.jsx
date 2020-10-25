import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logoutUser} from "../../redux/auth-reduces";

class HeaderContainer extends React.Component {

    render() {
        return (
            <Header isAuth={this.props.isAuth}
                    login={this.props.login}
                    logoutUser={this.props.logoutUser}
                    userPhoto={this.props.userPhoto}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        userPhoto: state.auth.userPhoto,
    }
};

let mapDispatchToProps = {
    logoutUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);