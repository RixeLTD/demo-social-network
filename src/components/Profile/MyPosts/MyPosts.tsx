import React from "react";
import Post from "./Post/Post";
import {Formik, FormikErrors} from 'formik';
import s from "../Profile.module.scss";
import AutoHeightTextarea from "../../../utils/AutoHeightTextarea";
import {PostsType} from "../../../types/types";

type MyPostsFormikType = {
    addPost: (postText: string) => void
}
const MyPostsFormik: React.FC<MyPostsFormikType> = ({
                           addPost
                       }) => {
type Values = {
    post: string
}
    return (
        <Formik
            initialValues={{post: ""}}
            validate={(values: Values) => {
                const errors: FormikErrors<Values> = {};
                if (values.post.length > 200) {
                    errors.post = 'Вы ввели больше 200 символов';
                }
                return errors;
            }}
            onSubmit={(values: Values, {setSubmitting}) => {
                setTimeout(() => {
                    addPost(values.post);
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
                    <button className={s.buttonAddPost} type="submit"
                            disabled={isSubmitting || Boolean(errors.post) || !values.post}
                    >
                        Опубликовать
                    </button>
                </form>
            )}
        </Formik>
    );
}

type MyPostsType = {
    ownProfile: boolean
    posts: Array<PostsType>
    photo: string | null
    userName: string

    addPost: (postText: string) => void
    removePost: (id: number) => void
}
const MyPosts: React.FC<MyPostsType> = ({
                                            ownProfile,
                                            posts,
                                            photo,
                                            userName,
                                            addPost,
                                            removePost
                                        }) => {

    let postsElements = posts.map(p => <Post message={p.message}
                                             likesCount={p.likesCount}
                                             id={p.id}
                                             key={p.id}
                                             photo={photo}
                                             userName={userName}
                                             removePost={removePost}
    />)


    return (
        <>
            {ownProfile ? <MyPostsFormik addPost={addPost}/> : null}
            {postsElements}
        </>
    );
}

export default MyPosts;