import React from "react";
import {Field, Formik, useFormikContext} from "formik";
import s from "../Profile.module.scss";

const StopSubmitting = ({errorMessage, disableEditMode, isSubmittingSuccess}) => {
    const {setSubmitting} = useFormikContext();
    React.useEffect(() => {
        if (errorMessage) {
            setSubmitting(false);
        }
        if (isSubmittingSuccess) {
            disableEditMode();
        }
    }, [disableEditMode, errorMessage, setSubmitting, isSubmittingSuccess]);
    return null;
};

const ProfileBlockForm = ({profile, disableEditMode, submitUpdateProfile, errorMessage, isSubmittingSuccess}) => {

    return (
        <Formik
            initialValues={{
                userId: profile.userId,
                fullName: profile.fullName,
                aboutMe: profile.aboutMe || "it's me",
                lookingForAJob: profile.lookingForAJob,
                lookingForAJobDescription: profile.lookingForAJobDescription || "Looking for a job description",
                contacts: {
                    github: profile.contacts.github,
                    vk: profile.contacts.vk,
                    facebook: profile.contacts.facebook,
                    instagram: profile.contacts.instagram,
                    twitter: profile.contacts.twitter,
                    website: profile.contacts.website,
                    youtube: profile.contacts.youtube,
                    mainLink: profile.contacts.mainLink,
                },
            }}
            validate={values => {
                const errors = {};
                if (!values.aboutMe) {
                    errors.aboutMe = 'Required';
                }
                if (!values.lookingForAJobDescription) {
                    errors.lookingForAJobDescription = 'Required';
                }
                return errors;
            }}

            onSubmit={(values) => {
                submitUpdateProfile(values);
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
                  /* and other goodies */
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
                                value={values.aboutMe}
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
                        <div className={s.contactContainer}>{Object.keys(profile.contacts).map(key => {
                            return (
                                <div key={key} className={s.contactItem}>
                                    <label htmlFor={key} className={s.contactKey}>{key}:</label>
                                    <input
                                        className={s.clearInputStyle}
                                        id={key}
                                        type="url"
                                        name={"contacts." + key}
                                        onChange={handleChange}
                                        value={values.contacts[key]}
                                        autoComplete="off"
                                    />
                                    {errors.key}
                                </div>
                            )
                        })}</div>
                    </div>
                    <div className={s.profileInfoSection}>
                        <button className={s.buttonCancel} type="button" onClick={disableEditMode}>
                            Отменить
                        </button>
                        <button className={s.buttonSave} type="submit"
                                disabled={isSubmitting || errors.aboutMe || errors.lookingForAJobDescription}>
                            Сохранить
                        </button>
                    </div>
                    <div className={s.formError}>{errorMessage}</div>
                    <StopSubmitting errorMessage={errorMessage} disableEditMode={disableEditMode}
                                    isSubmittingSuccess={isSubmittingSuccess}/>
                </form>
            )}
        </Formik>
    )
}
export default ProfileBlockForm;

