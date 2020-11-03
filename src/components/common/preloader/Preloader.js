import React from 'react';
import classes from "./Preloader.module.css";
import {connect} from "react-redux";

const Preloader = ({globalError}) => {
    
    return (
        <div className={classes.ldsBlock}>
            <div className={classes.ldsDefault}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            {/* { globalError && <GlobalError globalError={globalError}/> } */}
        </div>
        
    )
}

const mapStatetoProps = (state) => {
    return {
        globalError: state.app.globalError,
    }
    
}

export default connect(mapStatetoProps)(Preloader);