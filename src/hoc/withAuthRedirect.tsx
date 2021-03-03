import React from 'react';
import {Redirect} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {AppStateType} from "../redux/redux-store";


export function withAuthRedirect<P>(Component: React.ComponentType<P>) {

    const RedirectComponent: React.FC<PropsFromRedux> = ({
                                                              isAuth,
                                                              ...props
                                                          }) => {

        if (!isAuth) return <Redirect to={'/login'}/>

        return <Component {...props as P}/>
    }

    type MapStateProps = ReturnType<typeof mapStateToProps>
    const mapStateToProps = (state: AppStateType) => {
        return {
            isAuth: state.me.isAuth,
        }
    }

    const connector = connect(mapStateToProps, {})
    type PropsFromRedux = ConnectedProps<typeof connector>
    return connector(RedirectComponent)
}