import React from 'react'
import s from './Message.module.scss'
import {Formik, FormikErrors} from 'formik'
import AutoHeightTextarea from '../../../utils/AutoHeightTextarea'
import {useDispatch} from 'react-redux'

type PropsType = {
    activeDialog: number
    addMessage: (message: string, activeDialog: number) => void
}
export const MessageFormik: React.FC<PropsType> = ({
                                                       activeDialog,
                                                       addMessage
                                                   }) => {
    const dispatch = useDispatch()

    return (
        <Formik<{ message: string }>
            initialValues={{message: ''}}
            validate={(values) => {
                const errors: FormikErrors<{ message: string }> = {}
                if (values.message.length > 200) {
                    errors.message = 'Вы ввели больше 200 символов'
                }
                return errors
            }}
            onSubmit={(values, {setSubmitting}) => {
                dispatch(addMessage(values.message, activeDialog))
                values.message = ''
                setSubmitting(false)
            }}
        >
            {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
              }) => {
                return (
                    <form onSubmit={handleSubmit}
                          className={`${s.sendBlock}  ${errors.message ? s.errorTextarea : null}`}
                          onKeyUp={(event) => {
                              if (event.key === 'Enter' || event.key === 'Enter' || event.keyCode === 13) {
                                  handleSubmit()
                              }
                          }}
                    >
                        <div className={s.textareaContainer}>
                            <AutoHeightTextarea
                                className={`${s.textarea}`}
                                name="message"
                                onChange={handleChange}
                                value={values.message}
                                placeholder="Напишите сообщение"
                                autoFocus={true}
                            />
                            <button className={s.buttonSend} type="submit"
                                    disabled={Boolean(isSubmitting || errors.message || !values.message)}
                            >
                                Отправить
                            </button>
                        </div>
                        <div className={s.errorLength}>{errors.message}</div>
                    </form>
                )
            }}
        </Formik>
    )
}
