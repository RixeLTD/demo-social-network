import React from 'react';
import classes from "./Preloader.module.scss";

const Preloader = () => {
    
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
        </div>
        
    )
}

export default Preloader;