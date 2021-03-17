import React from 'react'
import s from './Message.module.scss'
import {Formik} from 'formik'
import {AutoSizeTextarea} from '../../../utils/AutoSizeTextarea'
import {useDispatch} from 'react-redux'
import {Button} from 'antd'

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
            onSubmit={(values, {setSubmitting}) => {
                dispatch(addMessage(values.message, activeDialog))
                values.message = ''
                setSubmitting(false)
            }}
        >
            {({
                  values,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
              }) => {
                return (
                    <form onSubmit={handleSubmit}
                          className={s.textareaContainer}
                          onKeyUp={(event) => {
                              if (event.key === 'Enter' || event.key === 'Enter' || event.keyCode === 13) {
                                  handleSubmit()
                              }
                          }}
                    >
                        <AutoSizeTextarea sharedProps={{
                            value: values.message,
                            onChange: handleChange,
                            name: "message",
                            placeholder: "Напишите сообщение",
                            style: {flexGrow: 2},
                            autoSize: {minRows: 1},
                            maxLength: 200,
                            focus: {cursor: 'end'}
                        }}
                        />
                        <Button htmlType="submit" disabled={Boolean(isSubmitting || !values.message)}>
                            Отправить
                        </Button>
                    </form>
                )
            }}
        </Formik>
    )
}
