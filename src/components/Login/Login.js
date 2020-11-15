import React from 'react';
import {Formik, useFormikContext} from 'formik';
import {loginUser} from "../../redux/auth-reduces";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import classes from "./Login.module.scss";
import {getIsAuth, getIsCaptcha, getLoginFormErrors} from "../../redux/auth-selectors";

const StopSubmitting = ({errorMessage}) => {
    const { setSubmitting } = useFormikContext();
    React.useEffect(() => {
        if (errorMessage) {
            setSubmitting(false);
        }
    }, [errorMessage, setSubmitting]);
    return null;
};

const LoginFormik = (props) => {
    return (
        <div>
            <Formik
                initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values) => {
                    props.onSubmit(values);
                    values.captcha = "";
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => {
                    return(
                    <form onSubmit={handleSubmit}>
                        <div className={classes.login}>
                            <input className={errors.email ? classes.errorInput : null}
                                   type="email"
                                   name="email"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.email}
                                   placeholder="Enter your email"
                            />
                            <div className={classes.required}>{errors.email && touched.email && errors.email}</div>
                        </div>
                        <div className={classes.password}>
                            <input className={errors.password ? classes.errorInput : null}
                                   autoComplete="off"
                                   type="password"
                                   name="password"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.password}
                                   placeholder="Enter your password"
                            />
                            <div className={classes.required}>{errors.password && touched.password && errors.password}</div>
                        </div>
                        <div className={classes.rememberMe}>
                            <label htmlFor="rememberMe">Remember me</label>
                            <input
                                type="checkbox"
                                name="rememberMe"
                                id="rememberMe"
                                onChange={handleChange}
                                value={values.rememberMe}
                            />
                        </div>
                        {props.isCaptcha ?
                            <div className={classes.captcha}>
                                <div className={classes.captchaImage}><img src={props.isCaptcha} alt=""/></div>
                                <input className={errors.captcha ? classes.errorInput : null}
                                       type="text"
                                       name="captcha"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.captcha}
                                       placeholder="Enter captcha"
                                       autoComplete="off"
                                />
                            </div> : null
                        }
                        <button type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                        <StopSubmitting errorMessage={props.errorMessage}/>
                    </form>
                )}}
            </Formik>
        </div>
    );
}

const Login = (props) => {

    const onSubmit = (formData) => {
        props.loginUser(formData);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={classes.loginBlock}>
            <h1>Login</h1>
            <LoginFormik isAuth={props.isAuth} isCaptcha={props.isCaptcha} onSubmit={onSubmit} errorMessage={props.errorMessage}/>
            <div className={classes.formError}>{props.errorMessage}</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: getIsAuth(state),
        isCaptcha: getIsCaptcha(state),
        errorMessage: getLoginFormErrors(state),
    }

}

export default connect(mapStateToProps, {loginUser})(Login);