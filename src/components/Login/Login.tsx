import React, {useEffect} from 'react'
import {Formik, useFormikContext} from 'formik'
import {LoginFormDataType, loginUser} from '../../redux/auth-reduces'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import s from './Login.module.scss'
import {getIsAuth, getIsCaptcha, getLoginFormErrors} from '../../redux/auth-selectors'

export const Login: React.FC = () => {

    const isAuth = useSelector(getIsAuth)
    const isCaptcha = useSelector(getIsCaptcha)
    const errorMessage = useSelector(getLoginFormErrors)

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <>
            <div className={s.loginBlock}>
                <h1>Login</h1>
                <LoginFormik isCaptcha={isCaptcha}
                             loginUser={loginUser}
                             errorMessage={errorMessage}/>
                <div className={s.formError}>{errorMessage}</div>
                <span>Данные тестового аккаунта:</span>
                <span>Email: free@samuraijs.com</span>
                <span>Password: free</span>
            </div>
        </>
    )
}

type PropsType = {
    isCaptcha: string
    errorMessage: string | null
    loginUser: (values: LoginFormDataType) => void
}
const LoginFormik: React.FC<PropsType> = ({loginUser, isCaptcha, errorMessage}) => {
    const dispatch = useDispatch()

    return (
        <Formik<LoginFormDataType>
            initialValues={{email: '', password: '', rememberMe: false, captcha: ''}}
            onSubmit={values => {
                dispatch(loginUser(values))
                values.captcha = ''
            }}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => {
                return (
                    <form onSubmit={handleSubmit} className={s.form}>
                        <input className={`${s.input}`}
                               type="email"
                               name="email"
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.email}
                               placeholder="Email"
                               required
                        />
                        <input className={`${s.input}`}
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
                                <input className={`${s.input}`}
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
    )
}

const StopSubmitting: React.FC<{errorMessage: string | null}> = ({errorMessage}) => {
    const {setSubmitting} = useFormikContext()
    useEffect(() => {
        if (errorMessage) {
            setSubmitting(false)
        }
    }, [errorMessage, setSubmitting])
    return null
}