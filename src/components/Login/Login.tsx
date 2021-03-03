import React from 'react';
import {Formik, useFormikContext} from 'formik';
import {loginUser} from "../../redux/auth-reduces";
import {connect, ConnectedProps} from "react-redux";
import {Redirect} from "react-router-dom";
import s from "./Login.module.scss";
import {getIsAuth, getIsCaptcha, getLoginFormErrors} from "../../redux/auth-selectors";
import {AppStateType} from "../../redux/redux-store";

type StopSubmittingType = {
    errorMessage: string | null
}
const StopSubmitting: React.FC<StopSubmittingType> = ({errorMessage}) => {
    const {setSubmitting} = useFormikContext();
    React.useEffect(() => {
        if (errorMessage) {
            setSubmitting(false);
        }
    }, [errorMessage, setSubmitting]);
    return null;
};

const LoginFormik: React.FC<PropsFromRedux> = ({loginUser, isCaptcha, errorMessage}) => {
    type Props = {
        email: string
        password: string
        rememberMe: boolean
        captcha: string
    }
    return (
        <Formik<Props>
            initialValues={{email: "", password: "", rememberMe: false, captcha: ""}}
            onSubmit={values => {
                loginUser(values);
                values.captcha = "";
            }}
        >
            {({
                  values,
                  errors,
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
                        <div className={s.rememberMe}>
                            <label htmlFor="rememberMe">Запомнить меня</label>
                            <input
                                type="checkbox"
                                name="rememberMe"
                                id="rememberMe"
                                onChange={handleChange}
                                checked={values.rememberMe}
                            />
                        </div>
                        {isCaptcha ?
                            <>
                                <img src={isCaptcha} className={s.captchaImage} alt=""/>
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
                        <StopSubmitting errorMessage={errorMessage}/>
                    </form>
                )
            }}
        </Formik>
    );
}

const Login: React.FC<PropsFromRedux> = ({loginUser, isAuth, isCaptcha, errorMessage,}) => {

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <>
            <div className={s.loginBlock}>
                <h1>Login</h1>
                <LoginFormik isAuth={isAuth} isCaptcha={isCaptcha} loginUser={loginUser}
                             errorMessage={errorMessage}/>
                <div className={s.formError}>{errorMessage}</div>
                <span>Данные тестового аккаунта:</span>
                <span>Email: free@samuraijs.com</span>
                <span>Password: free</span>
            </div>
        </>
    )
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: getIsAuth(state),
        isCaptcha: getIsCaptcha(state),
        errorMessage: getLoginFormErrors(state),
    }
}

const mapDispatchToProps = {
    loginUser
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(Login)