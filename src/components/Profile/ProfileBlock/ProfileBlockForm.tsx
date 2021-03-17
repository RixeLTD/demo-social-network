import React, {useEffect} from 'react'
import {Formik, useFormikContext} from 'formik'
import s from '../Profile.module.scss'
import {ContactsType, ProfileType} from '../../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {getIsSubmittingSuccess, getProfileFormErrors} from '../../../redux/profile-selectors'
import {updateProfileType} from '../../../api/api'
import {Button, Checkbox, Divider, Form, Input} from 'antd'
import {profileActions, updateProfile} from '../../../redux/profile-reducer'
import {Error} from '../../../utils/Error'

type ProfileBlockFormType = {
    profile: ProfileType
    disableEditMode: () => void
}
export const ProfileBlockForm: React.FC<ProfileBlockFormType> = ({
                                                                     profile,
                                                                     disableEditMode,
                                                                 }) => {
    const isSubmittingSuccess = useSelector(getIsSubmittingSuccess)
    const errorMessage = useSelector(getProfileFormErrors)
    const dispatch = useDispatch()


    const initialValues = {
        userId: profile.userId,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        fullName: profile.fullName,
        contacts: profile.contacts,
        aboutMe: profile.aboutMe
    }
    const formItemLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 12

        },
    }
    const tailLayout = {
        wrapperCol: {xs: {span: 16}, sm: {offset: 8, span: 16}},
    }

    return (
        <>
            <Error errorMessage={errorMessage} action={profileActions.setProfileFormErrors(null)}/>
            <Formik<updateProfileType>
                initialValues={initialValues}
                onSubmit={(values) => {
                    dispatch(updateProfile(values))
                }}
            >
                {({
                      values,
                      handleChange,
                      handleSubmit,
                      isSubmitting
                  }) => {
                    return (
                        <div className={s.profileInfoSection}>
                            <Form onFinish={handleSubmit}
                                  {...formItemLayout}
                            >
                                <Divider plain>Профиль</Divider>

                                <Form.Item label="Имя:"
                                           hasFeedback
                                           validateStatus={values.fullName?.length !== 0 ? '' : 'warning'}
                                           className={s.input}
                                >
                                    <Input type="text"
                                           name="fullName"
                                           value={values.fullName}
                                           onChange={handleChange}
                                           placeholder="Нельзя оставлять пустым"
                                    />
                                </Form.Item>

                                <Form.Item label="Обо мне"
                                           hasFeedback
                                           validateStatus={values.aboutMe?.length !== 0 ? '' : 'warning'}
                                           className={s.input}
                                >
                                    <Input.TextArea name="aboutMe"
                                                    value={values.aboutMe as string}
                                                    onChange={handleChange}
                                                    placeholder="Нельзя оставлять пустым"
                                                    autoSize={true}
                                    />

                                </Form.Item>

                                <Form.Item {...tailLayout}
                                           className={s.input}
                                >
                                    <Checkbox
                                        name="lookingForAJob"
                                        onChange={handleChange}
                                        checked={values.lookingForAJob}
                                    >
                                        В поисках работы:
                                    </Checkbox>
                                </Form.Item>

                                {values.lookingForAJob ?
                                    <Form.Item label="Описание"
                                               hasFeedback
                                               validateStatus={values.lookingForAJobDescription?.length !== 0 ? '' : 'warning'}
                                               className={s.input}
                                    >
                                        <Input.TextArea name="lookingForAJobDescription"
                                                        value={values.lookingForAJobDescription}
                                                        onChange={handleChange}
                                                        placeholder="Нельзя оставлять пустым"
                                                        autoSize={true}
                                        />

                                    </Form.Item> : null}

                                <Divider plain>Контакты</Divider>

                                {Object.keys(profile.contacts).map(contact => {
                                    return (
                                        <div key={contact} className={s.contactItem}>
                                            <Form.Item label={contact}
                                                       className={s.input}
                                            >
                                                <Input type="url"
                                                       name={`contacts.${contact}`}
                                                       value={values.contacts[contact as keyof ContactsType]}
                                                       onChange={handleChange}
                                                       placeholder={`http://${contact}.com`}
                                                />
                                            </Form.Item>
                                        </div>
                                    )
                                })}
                                <Form.Item {...tailLayout}>
                                    <Button onClick={disableEditMode} style={{margin: '10px 10px 0 0'}}>Отмена</Button>
                                    <Button htmlType='submit'
                                            type='primary'
                                            loading={isSubmitting}
                                            disabled={!values.aboutMe || !values.lookingForAJobDescription || !values.fullName}>
                                        Сохранить
                                    </Button>
                                </Form.Item>

                                <StopSubmitting errorMessage={errorMessage}
                                                disableEditMode={disableEditMode}
                                                isSubmittingSuccess={isSubmittingSuccess}/>
                            </Form>
                        </div>
                    )
                }}
            </Formik>
        </>
    )
}

type StopSubmittingType = {
    errorMessage: string | null
    isSubmittingSuccess: boolean
    disableEditMode: () => void
}
const StopSubmitting: React.FC<StopSubmittingType> = ({
                                                          errorMessage,
                                                          disableEditMode,
                                                          isSubmittingSuccess
                                                      }) => {
    const {setSubmitting} = useFormikContext()
    useEffect(() => {
        if (errorMessage) {
            setSubmitting(false)
        }
        if (isSubmittingSuccess) {
            disableEditMode()
        }
    }, [disableEditMode, errorMessage, setSubmitting, isSubmittingSuccess])
    return null
}
