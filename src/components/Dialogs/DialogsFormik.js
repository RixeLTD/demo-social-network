import React from 'react';
import s from './Message/Message.module.scss';
import {Formik} from "formik";
import AutoHeightTextarea from "../../utils/AutoHeightTextarea";

let DialogsFormik = ({
                         activeDialog,
                         addMessage
                     }) => {
    return (
        <Formik
            initialValues={{message: ''}}
            validate={values => {
                const errors = {};
                if (values.message.length > 200) {
                    errors.message = 'Вы ввели больше 200 символов';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    addMessage(values.message, activeDialog);
                    values.message = '';
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit} className={`${s.sendBlock}  ${errors.message ? s.errorTextarea : null}`}>
                    <div className={s.textareaContainer}>
                        <AutoHeightTextarea
                        className={`${s.textarea}`}
                        name="message"
                        onChange={handleChange}
                        value={values.message}
                        placeholder="Напишите сообщение"
                        autoFocus={"autoFocus"}/>
                        <button className={s.buttonSend} type="submit"
                                disabled={isSubmitting || errors.message || !values.message}>
                            Отправить
                        </button>
                    </div>
                    <div className={s.errorLength}>{errors.message}</div>
                </form>
            )}
        </Formik>
    )
}

export default DialogsFormik;