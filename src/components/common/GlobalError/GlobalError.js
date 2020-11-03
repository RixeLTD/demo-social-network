import React from 'react';
import classes from "./GlobalError.module.css";
import {connect} from "react-redux";
import {setGlobalError, setIsVisibleGlobalError} from "../../../redux/app-reduces";

const GlobalError = ({isVisibleGlobalError, globalError, setIsVisibleGlobalError}) => {

    const onClickButton = () => {
        setIsVisibleGlobalError(false);
        setGlobalError(null);
    }

    return (
        <>
        { isVisibleGlobalError ? <div className={classes.modal}>
                <div className={classes.content}>{globalError}</div>
                <div className={classes.actions}>
                    <button className={classes.toggleButton} onClick={onClickButton}>X</button>
                </div>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalError);