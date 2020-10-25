import React from 'react';
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLength} from "../../../utils/validators";
import {Textarea} from "../../common/FormsControl/FormsControl";

const maxLength30 = maxLength(30);

let MyPostsForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component={Textarea} name={'postText'} placeholder={'Enter your post'} validate={[maxLength30]}/></div>
            <div><button type={'submit'}>Add post</button></div>
        </form>
    )
}

MyPostsForm = reduxForm({
    form: 'postForm'
})(MyPostsForm)

const MyPosts = (props) => {

    let postsElements = props.posts.map( p => <Post message={p.message} likesCount={p.likesCount} key={p.id} />);

    const onSubmit = (formData) => {
        props.onPostClickContainer(formData.postText);
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <MyPostsForm onSubmit={onSubmit}/>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;