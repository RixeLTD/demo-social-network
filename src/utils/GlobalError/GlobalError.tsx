import React from 'react'
import s from "./GlobalError.module.scss"
import {connect, ConnectedProps} from "react-redux"
import {appActions} from "../../redux/app-reduces"
import {AppStateType} from "../../redux/redux-store";

const GlobalError: React.FC<PropsFromRedux> = ({
                         isVisibleGlobalError,
                         setGlobalError,
                         globalError,
                         setIsVisibleGlobalError
                     }) => {

    const closeError = () => {
        setIsVisibleGlobalError(false);
        setGlobalError("");
    }

    return (
        <>
            {isVisibleGlobalError ? <div className={s.modal}>
                <div className={s.text}>{globalError}</div>
                <button className={s.button} onClick={closeError}>X</button>
            </div> : null
            }
        </>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        globalError: state.app.globalError,
        isVisibleGlobalError: state.app.isVisibleGlobalError,
    }
}

const mapDispatchToProps = {
    setIsVisibleGlobalError: appActions.setIsVisibleGlobalError,
    setGlobalError: appActions.setGlobalError
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(GlobalError);