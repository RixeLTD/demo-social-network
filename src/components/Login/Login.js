import React from 'react';
import {Field, reduxForm} from "redux-form";
import {loginUser, logoutUser} from "../../redux/auth-reduces";
import {Input} from "../common/FormsControl/FormsControl";
import {maxLength, required} from "../../utils/validators";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import classes from "./../common/FormsControl/FormsControl.module.css";

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={'email'} type="text" placeholder={'Email'}
                       validate={[required]}/>
            </div>
            <div>
                <Field component={Input} name={'password'} type="password" placeholder={'Password'}
                       validate={[required]}/>
            </div>
            { props.error && (<div className={classes.summaryFormError}>{props.error}</div>) }
            <div>
                <label>
                    <Field component={Input} name={'rememberMe'} type="checkbox"/>Remember me
                </label>
            </div>
            {props.isCaptcha
                ? <div>
                    <Field component={Input} name={'captcha'} type="text" validate={[required]} placeholder={'Captcha'}/>
                    <div><img src={props.isCaptcha} alt=""/></div>
                </div>
                : null
            }
            <div>
                <button type={"submit"}>Login</button>
            </div>
        </form>
    )
}

LoginForm = reduxForm({
    form: "loginForm",
})(LoginForm)

const Login = (props) => {

    const onSubmit = (formData) => {

        props.loginUser(formData);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm isAuth={props.isAuth} isCaptcha={props.isCaptcha} onSubmit={onSubmit}/>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        isCaptcha: state.auth.isCaptcha,
    }

}

export default connect(mapStateToProps, {loginUser, logoutUser})(Login);