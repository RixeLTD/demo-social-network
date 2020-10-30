import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {Formik} from 'formik';

const MyPostsFormik = (props) => (
    <div>
        <Formik
            initialValues={{post: ''}}
            validate={values => {
                const errors = {};
                if (values.post.length > 200) {
                    errors.post = 'text more then 200 symbols';
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
                <form onSubmit={handleSubmit}>
                    <div>
                        <textarea className={`${classes.post} ${errors.post ? classes.errorTextarea : null}`}
                                  cols="50"
                                  rows="4"
                                  name="post"
                                  onChange={handleChange}
                                  value={values.post}
                                  placeholder="Enter your post"
                        />
                        <div className={classes.errorLength}>{errors.post}</div>
                    </div>
                    <button type="submit" disabled={isSubmitting || errors.post || !values.post}>
                        Add post
                    </button>
                </form>
            )}
        </Formik>
    </div>
);

const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>);

    const onSubmit = (values) => {
        props.onPostClickContainer(values.post);
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <MyPostsFormik onSubmit={onSubmit}/>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;