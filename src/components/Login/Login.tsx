import React from 'react'
import {authActions, LoginFormDataType, loginUser} from '../../redux/auth-reduces'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import s from './Login.module.scss'
import {getIsAuth, getIsCaptcha, getLoginFormErrors, selectIsFetching} from '../../redux/auth-selectors'
import {Button, Checkbox, Form, Input} from 'antd'
import {Formik} from 'formik'
import {Error} from '../../utils/Error'

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
}
const tailLayout = {
    wrapperCol: {xs: {span: 16}, sm: {offset: 8, span: 16}},
}

function validateEmail(email: string) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(email)
}

export const Login = () => {

    const isAuth = useSelector(getIsAuth)
    const isCaptcha = useSelector(getIsCaptcha)
    const errorMessage = useSelector(getLoginFormErrors)
    const isFetching = useSelector(selectIsFetching)
    const dispatch = useDispatch()

    const initialValues = {
        email: '',
        password: '',
        rememberMe: true,
        captcha: ''
    }

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.container}>
            <Error action={authActions.setLoginFormErrors(null)} errorMessage={errorMessage}/>
            <Formik<LoginFormDataType>
                initialValues={initialValues}
                onSubmit={(values) => {
                    dispatch(loginUser(values))
                    values.captcha = ''
                }}
            >
                {({
                      values,
                      handleChange,
                      handleSubmit,
                  }) => {
                    return (
                        <>
                            <Form {...layout}
                                  onFinish={handleSubmit}
                            >
                                <Form.Item
                                    label="E-mail"
                                    hasFeedback
                                    validateStatus={validateEmail(values.email) ? '' : 'warning'}
                                >
                                    <Input type='email'
                                           name='email'
                                           autoComplete='on'
                                           onChange={handleChange}
                                           value={values.email}
                                           placeholder="E-mail"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Пароль"
                                    hasFeedback
                                    validateStatus={values.email?.length !== 0 ? '' : 'warning'}
                                >
                                    <Input.Password name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    placeholder="Password"
                                                    autoComplete='on'/>
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Checkbox name="rememberMe"
                                              onChange={handleChange}
                                              checked={values.rememberMe}
                                    >
                                        Запомнить меня
                                    </Checkbox>
                                </Form.Item>

                                {isCaptcha ? <Form.Item
                                        label="Captcha"
                                        help={<img src={isCaptcha} className={s.captchaImage} alt="captcha"/>}
                                    >
                                        <Input name="captcha"
                                               onChange={handleChange}
                                               value={values.captcha}
                                               placeholder="Введите символы"
                                               autoComplete="off"
                                        />
                                    </Form.Item>
                                    : null}
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit" loading={isFetching}>
                                        Войти
                                    </Button>
                                </Form.Item>

                            </Form>
                            <span>Данные тестового аккаунта:</span>
                            <span>Email: free@samuraijs.com</span>
                            <span>Password: free</span>
                        </>
                    )
                }}
            </Formik>
        </div>
    )
}

