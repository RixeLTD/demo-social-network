import React from "react";
import {Field, Formik, FormikErrors, useFormikContext} from "formik";
import s from "../Profile.module.scss";
import {ContactsType, ProfileType} from "../../../types/types";

type StopSubmittingType = {
    localErrorMessage: string | null
    isSubmittingSuccess: boolean

    disableEditMode: () => void
}

const StopSubmitting: React.FC<StopSubmittingType> = ({
                                                          localErrorMessage,
                                                          disableEditMode,
                                                          isSubmittingSuccess
                                                      }) => {
    const {setSubmitting} = useFormikContext();
    React.useEffect(() => {
        if (localErrorMessage) {
            setSubmitting(false);
        }
        if (isSubmittingSuccess) {
            disableEditMode();
        }
    }, [disableEditMode, localErrorMessage, setSubmitting, isSubmittingSuccess]);
    return null;
};

type ProfileBlockFormType = {
    profile: ProfileType
    updateProfile: (value: ProfileType) => void
    localErrorMessage: string | null
    isSubmittingSuccess: boolean

    disableEditMode: () => void
}

const ProfileBlockForm: React.FC<ProfileBlockFormType> = ({
                                                              profile,
                                                              disableEditMode,
                                                              updateProfile,
                                                              localErrorMessage,
                                                              isSubmittingSuccess
                                                          }) => {
type Values = {
    aboutMe: string | null,
    lookingForAJobDescription: string | null
}
    return (
        <Formik
            initialValues={profile}
            validate={values => {
                const errors: FormikErrors<Values> = {}
                if (!values.aboutMe) {
                    errors.aboutMe = 'Required';
                }
                if (!values.lookingForAJobDescription) {
                    errors.lookingForAJobDescription = 'Required';
                }
                return errors
            }}

            onSubmit={(values) => {
                updateProfile(values);
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
                                        name={"contacts." + contact}
                                        onChange={handleChange}
                                        value={profile.contacts[contact as keyof ContactsType]}
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
                    <div className={s.formError}>{localErrorMessage}</div>
                    <StopSubmitting localErrorMessage={localErrorMessage}
                                    disableEditMode={disableEditMode}
                                    isSubmittingSuccess={isSubmittingSuccess}/>
                </form>
            )}
        </Formik>
    )
}
export default ProfileBlockForm;

