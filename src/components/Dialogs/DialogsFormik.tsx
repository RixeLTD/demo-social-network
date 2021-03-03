import React from 'react';
import s from './Message/Message.module.scss';
import {Formik} from "formik";
import AutoHeightTextarea from "../../utils/AutoHeightTextarea";

type PropsType = {
    activeDialog: number
    addMessage: (text: string, activeDialog: number) => void
}
const DialogsFormik: React.FC<PropsType> = ({
                                                activeDialog,
                                                addMessage
                                            }) => {
    type Props = {
        message: string
    }
    type Errors = {
        message?: string
    }
    return (
        <Formik<Props>
            initialValues={{message: ""}}
            validate={(values) => {
                const errors: Errors = {}
                if (values.message.length > 200) {
                    errors.message = "Вы ввели больше 200 символов";
                }
                return errors;
            }}
            onSubmit={(values) => {
                addMessage(values.message, activeDialog);
                values.message = "";
            }}
        >
            {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => {
                return (
                    <form onSubmit={handleSubmit} className={`${s.sendBlock}  ${errors.message ? s.errorTextarea : null}`}>
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

export default DialogsFormik;