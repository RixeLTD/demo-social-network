import React from 'react';
import classes from './Settings.module.css';
import {connect} from "react-redux";

const Settings = (props) => {
    return (
        <div>
            <button className={classes.editProfile} onClick={props.onEditProfile}>Edit profile</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);