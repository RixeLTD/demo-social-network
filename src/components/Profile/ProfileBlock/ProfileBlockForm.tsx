import React, {useEffect} from 'react'
import {Field, Formik, FormikErrors, useFormikContext} from 'formik'
import s from '../Profile.module.scss'
import {ContactsType, ProfileType} from '../../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {updateProfile} from '../../../redux/profile-reducer'
import {getIsSubmittingSuccess, getProfileFormErrors} from '../../../redux/profile-selectors'
import {updateProfileType} from '../../../api/api'

type ProfileBlockFormType = {
    profile: ProfileType
    disableEditMode: () => void
}

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
                        <div className={s.item}>
                            <label htmlFor="fullName">
                                <div className={s.itemKey}>Имя:</div>
                            </label>
                            <input
                                className={s.clearInputStyle}
                                id="fullName"
                                type="text"
                                name="fullName"
                                onChange={handleChange}
                                value={values.fullName}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className={s.profileInfoSection}>
                        <div className={s.item}>
                            <label htmlFor="aboutMe">
                                <div className={s.itemKey}>Обо мне:</div>
                            </label>
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
                        </div>
                        <div className={s.item}>
                            <label className={s.itemKey}>
                                <div>В поисках работы:</div>
                                <Field type="checkbox" name="lookingForAJob"/>
                            </label>
                        </div>
                        {values.lookingForAJob
                            ? <div className={s.item}>
                                <label className={s.itemKey} htmlFor="lookingForAJobDescription">
                                    <div>Статус поиска работы:</div>
                                </label>
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
                            </div> : null}
                    </div>
                    <div className={s.profileInfoSection}>
                        <div className={s.itemKey}>Контакты:</div>
                        <div className={s.contactContainer}>{Object.keys(profile.contacts).map(contact => {
                            return (
                                <div key={contact} className={s.contactItem}>
                                    <label htmlFor={contact} className={s.contactKey}>{contact}:</label>
                                    <input
                                        className={s.clearInputStyle}
                                        id={contact}
                                        type="url"
                                        name={`contacts.${contact}`}
                                        onChange={handleChange}
                                        value={values.contacts[contact as keyof ContactsType]}
                                        autoComplete="off"
                                    />
                                </div>
                            )
                        })}</div>
                    </div>
                    <div className={s.profileInfoSection}>
                        <button className={s.buttonCancel} type="button" onClick={disableEditMode}>
                            Отменить
                        </button>
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
