import React, {useEffect} from 'react'
import {Field, Formik, FormikErrors, useFormikContext} from 'formik'
import s from '../Profile.module.scss'
import {ContactsType, ProfileType} from '../../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {updateProfile} from '../../../redux/profile-reducer'
import {getIsSubmittingSuccess, getProfileFormErrors} from '../../../redux/profile-selectors'
import {updateProfileType} from '../../../api/api'
import {Button, Col, Row} from 'antd'

type ProfileBlockFormType = {
    profile: ProfileType
    disableEditMode: () => void
}

const flexLeftColumn = '180px'
const flexRightColumn = '300px'

export const ProfileBlockForm: React.FC<ProfileBlockFormType> = ({
                                                                     profile,
                                                                     disableEditMode,
                                                                 }) => {
    const errorMessage = useSelector(getProfileFormErrors)
    const isSubmittingSuccess = useSelector(getIsSubmittingSuccess)
    const dispatch = useDispatch()

    type Values = {
        aboutMe: string | null,
        lookingForAJobDescription: string | null
    }
    const initialValues = {
        userId: profile.userId,
        lookingForAJob: profile.lookingForAJob,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        fullName: profile.fullName,
        contacts: profile.contacts,
        aboutMe: profile.aboutMe
    }
    return (
        <Formik<updateProfileType>
            initialValues={initialValues}
            validate={values => {
                const errors: FormikErrors<Values> = {}
                if (!values.aboutMe) {
                    errors.aboutMe = 'Required'
                }
                if (!values.lookingForAJobDescription) {
                    errors.lookingForAJobDescription = 'Required'
                }
                return errors
            }}
            onSubmit={(values) => {
                dispatch(updateProfile(values))
            }}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                    <div className={s.profileInfoSection}>
                        <Row align='middle'>
                            <Col flex={flexLeftColumn}>
                                <b>Имя:</b>
                            </Col>
                            <Col flex={flexRightColumn}>
                                <input
                                    className={s.clearInputStyle}
                                    id="fullName"
                                    type="text"
                                    name="fullName"
                                    onChange={handleChange}
                                    value={values.fullName}
                                    autoComplete="off"
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className={s.profileInfoSection}>
                        <Row align='middle'>
                            <Col flex={flexLeftColumn}>
                                <b>Обо мне:</b>
                            </Col>
                            <Col flex={flexRightColumn}>
                                <input
                                    className={s.clearInputStyle}
                                    id="aboutMe"
                                    type="text"
                                    name="aboutMe"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.aboutMe as string}
                                    required
                                    autoComplete="off"
                                />
                                {errors.aboutMe && touched.aboutMe && errors.aboutMe}
                            </Col>
                        </Row>
                        <Row align='middle' style={{marginTop: 10}}>
                            <Col flex={flexLeftColumn}>
                                <b>В поисках работы:</b>
                            </Col>
                            <Col flex={flexRightColumn}>
                                <Field type="checkbox" name="lookingForAJob"/>
                            </Col>
                        </Row>
                        {values.lookingForAJob
                            ? <Row align='middle' style={{marginTop: 10}}>
                                <Col flex={flexLeftColumn}>
                                    <b>Статус поиска работы:</b>
                                </Col>
                                <Col flex={flexRightColumn}>
                                    <input
                                        className={s.clearInputStyle}
                                        id="lookingForAJobDescription"
                                        type="text"
                                        name="lookingForAJobDescription"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lookingForAJobDescription}
                                        required
                                        autoComplete="off"
                                    />
                                    {errors.lookingForAJobDescription && touched.lookingForAJobDescription && errors.lookingForAJobDescription}
                                </Col>
                            </Row> : null}
                    </div>
                    <div className={s.profileInfoSection}>
                        <b>Контакты:</b>
                        <div className={s.contactContainer}>{Object.keys(profile.contacts).map(contact => {
                            return (
                                <div key={contact} className={s.contactItem}>
                                    <Row align='middle'>
                                        <Col flex={flexLeftColumn}>
                                            <b>{contact}:</b>
                                        </Col>
                                        <Col flex={flexRightColumn}>
                                            <input
                                                className={s.clearInputStyle}
                                                id={contact}
                                                type="url"
                                                name={`contacts.${contact}`}
                                                onChange={handleChange}
                                                value={values.contacts[contact as keyof ContactsType]}
                                                autoComplete="off"
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })}</div>
                    </div>
                    <div className={s.profileInfoSection}>
                        <Button onClick={disableEditMode} style={{marginRight: '10px'}}>Отмена</Button>
                        <button className={s.buttonSave} type="submit"
                                disabled={isSubmitting || Boolean(errors.aboutMe) || Boolean(errors.lookingForAJobDescription)}>
                            Сохранить
                        </button>
                    </div>
                    <div className={s.formError}>{errorMessage}</div>
                    <StopSubmitting errorMessage={errorMessage}
                                    disableEditMode={disableEditMode}
                                    isSubmittingSuccess={isSubmittingSuccess}/>
                </form>
            )}
        </Formik>
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
