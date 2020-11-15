import React from "react";
import Post from "./Post/Post";
import {Formik} from 'formik';
import s from "../Profile.module.scss";
import AutoHeightTextarea from "../../../utils/AutoHeightTextarea";

const MyPostsFormik = (props) => {

    return (
        <Formik
            initialValues={{post: ''}}
            validate={values => {
                const errors = {};
                if (values.post.length > 200) {
                    errors.post = 'Вы ввели больше 200 символов';
                }
                return errors;
            }}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    props.onSubmit(values);
                    values.post = '';
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
                <form onSubmit={handleSubmit} className={s.profileInfoSection}>
                    <div className={s.textareaContainer}>
                        <AutoHeightTextarea
                        className={`${s.textarea} ${errors.post ? s.errorTextarea : null}`}
                        name="post"
                        onChange={handleChange}
                        value={values.post}
                        placeholder="Что у вас нового?"/>
                    </div>
                    <div className={s.errorLength}>{errors.post}</div>
                    <button className={s.buttonAddPost} type="submit" disabled={isSubmitting || errors.post || !values.post}>
                        Опубликовать
                    </button>
                </form>
            )}
        </Formik>
    );
}

const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message}
                                                   likesCount={p.likesCount}
                                                   id={p.id}
                                                   key={p.id}
                                                   photo={props.photo}
                                                   userName={props.userName}
                                                   removePost={props.removePost}/>);

    const onSubmit = (values) => {
        props.addPost(values.post);
    }

    return (
        <>
            {props.ownProfile ? <MyPostsFormik onSubmit={onSubmit}/> : null}
            {postsElements}
        </>
    );
}

export default MyPosts;