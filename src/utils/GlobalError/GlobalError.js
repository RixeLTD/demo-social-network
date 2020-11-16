import React from 'react';
import s from "./GlobalError.module.scss";
import {connect} from "react-redux";
import {setGlobalError, setIsVisibleGlobalError} from "../../redux/app-reduces";

const GlobalError = ({isVisibleGlobalError, setGlobalError, globalError, setIsVisibleGlobalError}) => {

    const closeError = () => {
        setIsVisibleGlobalError(false);
        setGlobalError(null);
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

const mapStateToProps = (state) => {
    return {
        globalError: state.app.globalError,
        isVisibleGlobalError: state.app.isVisibleGlobalError,
    }
}

const mapDispatchToProps = {
    setIsVisibleGlobalError,
    setGlobalError
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalError);