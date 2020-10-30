import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Formik} from "formik";

let DialogsFormik = (props) => {
    return (
        <Formik
            initialValues={{message: ''}}
            validate={values => {
                const errors = {};
                if (values.message.length > 200) {
                    errors.message = 'text more then 200 symbols';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    props.onSubmit(values);
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
                <form onSubmit={handleSubmit}>
                    <div>
                        <textarea className={`${classes.newMessage} ${errors.message ? classes.errorTextarea : null}`}
                                  cols="40"
                                  rows="4"
                                  name="message"
                                  onChange={handleChange}
                                  value={values.message}
                                  placeholder="Enter your message"
                        />
                        <div className={classes.errorLength}>{errors.message}</div>
                    </div>
                    <button type="submit" disabled={isSubmitting || errors.message || !values.message}>
                        Send message
                    </button>
                </form>
            )}
        </Formik>
    )
}

const Dialogs = (props) => {

    let dialogsElements = props.messagesPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} image={d.image} key={d.id}/>);

    let messagesElements = props.messagesPage.messages.map(m => <Message message={m.message} isMe={m.isMe} key={m.id}/>);

    const onSubmit =(values) => {
        props.onMessageClickContainer(values.message);
    }


    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <DialogsFormik onSubmit={onSubmit}/>
            </div>

        </div>
    );
}

export default Dialogs;