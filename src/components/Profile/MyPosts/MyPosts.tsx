import React from 'react'
import Post from './Post/Post'
import {Formik} from 'formik'
import s from '../Profile.module.scss'
import AutoHeightTextarea from '../../../utils/AutoHeightTextarea'
import {useDispatch, useSelector} from 'react-redux'
import {profileActions} from '../../../redux/profile-reducer'
import {getPosts} from '../../../redux/profile-selectors'

const MyPostsFormik: React.FC = () => {
    const dispatch = useDispatch()

    return (
        <Formik<{ post: string }>
            initialValues={{post: ''}}
            validate={values => {
                const errors: { post?: string } = {}
                if (values.post.length > 200) {
                    errors.post = 'Вы ввели больше 200 символов'
                }
                return errors
            }}
            onSubmit={(values, {setSubmitting}) => {
                dispatch(profileActions.addPost(values.post))
                values.post = ''
                setSubmitting(false)
            }}
        >
            {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  isSubmitting
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
    )
}

type MyPostsType = {
    ownProfile: boolean
    photo: string | null
    userName: string
}
export const MyPosts: React.FC<MyPostsType> = ({
                                                   ownProfile,
                                                   photo,
                                                   userName,
                                               }) => {
    const posts = useSelector(getPosts)

    let postsElements = posts.map(p => <Post message={p.message}
                                             likesCount={p.likesCount}
                                             id={p.id}
                                             key={p.id}
                                             photo={photo}
                                             userName={userName}
    />)

    return (
        <>
            {ownProfile ? <MyPostsFormik/> : null}
            {postsElements}
        </>
    )
}
