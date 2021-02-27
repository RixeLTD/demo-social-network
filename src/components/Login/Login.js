import React from 'react';
import {Formik, useFormikContext} from 'formik';
import {LoginFormDataType, loginUser} from "../../redux/auth-reduces";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import s from "./Login.module.scss";
import {getIsAuth, getIsCaptcha, getLoginFormErrors} from "../../redux/auth-selectors";

const StopSubmitting = ({errorMessage}) => {
    const {setSubmitting} = useFormikContext();
    React.useEffect(() => {
        if (errorMessage) {
            setSubmitting(false);
        }
    }, [errorMessage, setSubmitting]);
    return null;
};

// type Values = LoginFormDataType
const LoginFormik = (props) => {
    return (
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
                return (
                    <form onSubmit={handleSubmit} className={s.form}>
                        <input className={`${s.input} ${errors.email ? s.errorInput : null}`}
                               type="email"
                               name="email"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.email}
                               placeholder="Email"
                               required
                        />
                        {/*<div className={s.required}>{errors.email && touched.email && errors.email}</div>*/}
                        <input className={`${s.input} ${errors.password ? s.errorInput : null}`}
                               autoComplete="off"
                               type="password"
                               name="password"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.password}
                               placeholder="Password"
                               required
                        />
                        {/*<div className={s.required}>{errors.password && touched.password && errors.password}</div>*/}
                        <div className={s.rememberMe}>
                            <label htmlFor="rememberMe">Запомнить меня</label>
                            <input
                                type="checkbox"
                                name="rememberMe"
                                id="rememberMe"
                                onChange={handleChange}
                                value={values.rememberMe}
                            />
                        </div>
                        {props.isCaptcha ?
                            <>
                                <img src={props.isCaptcha} className={s.captchaImage} alt=""/>
                                <input className={`${s.input} ${errors.captcha ? s.errorInput : null}`}
                                       type="text"
                                       name="captcha"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.captcha}
                                       placeholder="Введите символы"
                                       autoComplete="off"
                                />
                            </> : null
                        }
                        <button type="submit" disabled={isSubmitting} className={s.button}>
                            Login
                        </button>
                        <StopSubmitting errorMessage={props.errorMessage}/>
                    </form>
                )
            }}
        </Formik>
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
        <>
            <div className={s.loginBlock}>
                <h1>Login</h1>
                <LoginFormik isAuth={props.isAuth} isCaptcha={props.isCaptcha} onSubmit={onSubmit}
                             errorMessage={props.errorMessage}/>
                <div className={s.formError}>{props.errorMessage}</div>
                <span>Данные тестового аккаунта:</span>
                <span>Email: free@samuraijs.com</span>
                <span>Password: free</span>
            </div>
        </>
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