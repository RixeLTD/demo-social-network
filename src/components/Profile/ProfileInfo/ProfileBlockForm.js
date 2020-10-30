import React from "react";
import classes from "./ProfileInfo.module.css";
import {Field, Formik, useFormikContext} from "formik";

const StopSubmitting = ({errorMessage, disableEditMode, isSubmittingSuccess}) => {
    const { setSubmitting } = useFormikContext();
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
                if (!values.aboutMe) {errors.aboutMe = 'Required';}
                if (!values.lookingForAJobDescription) {errors.lookingForAJobDescription = 'Required';}
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
                    <div className={''}>
                        <div className={''}>
                            <label htmlFor="fullName"><b>Имя: </b></label>
                            <input
                                id="fullName"
                                type="text"
                                name="fullName"
                                onChange={handleChange}
                                value={values.fullName}
                            />
                        </div>
                        <div className={''}>
                            <label htmlFor="aboutMe"><b>About me: </b></label>
                            <input
                                id="aboutMe"
                                type="text"
                                name="aboutMe"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.aboutMe}
                                required
                            />
                            {errors.aboutMe && touched.aboutMe && errors.aboutMe}
                        </div>
                        <div>
                            <label><b>В поисках работы:</b>
                                <Field type="checkbox" name="lookingForAJob"/>
                            </label>
                        </div>
                    </div>
                    {values.lookingForAJob ? <div className={''}>
                        <label htmlFor="lookingForAJobDescription"><b>Статус поиска работы:</b> </label>
                        <input
                            id="lookingForAJobDescription"
                            type="text"
                            name="lookingForAJobDescription"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lookingForAJobDescription}
                            required
                        />
                        {errors.lookingForAJobDescription && touched.lookingForAJobDescription && errors.lookingForAJobDescription}
                    </div> : null}
                    <div><b>Контакты:</b> {Object.keys(profile.contacts).map(key => {

                        return <div className={classes.contactValue} key={key}>
                            <label htmlFor={key}><b>{key}:</b></label>
                            <input
                                id={key}
                                type="url"
                                name={"contacts." + key}
                                onChange={handleChange}
                                value={values.contacts[key]}

                            />
                            {errors.key}
                        </div>
                    })}</div>

                    <button onClick={disableEditMode}>
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting || errors.aboutMe || errors.lookingForAJobDescription}>
                        Save
                    </button>
                    <div className={classes.formError}>{errorMessage}</div>
                    <StopSubmitting errorMessage={errorMessage} disableEditMode={disableEditMode} isSubmittingSuccess={isSubmittingSuccess}/>
                </form>
            )}
        </Formik>
    )
}
export default ProfileBlockForm;

