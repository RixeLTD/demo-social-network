import React from 'react'
import Post from './Post/Post'
import {Formik} from 'formik'
import s from '../Profile.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {profileActions} from '../../../redux/profile-reducer'
import {getPosts} from '../../../redux/profile-selectors'
import {AutoSizeTextarea} from '../../../utils/AutoSizeTextarea'
import {Button} from 'antd'

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
    const posts = [...useSelector(getPosts)].reverse()

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

const MyPostsFormik: React.FC = () => {
    const dispatch = useDispatch()

    return (
        <Formik<{ post: string }>
            initialValues={{post: ''}}
            onSubmit={(values, {setSubmitting}) => {
                dispatch(profileActions.addPost(values.post))
                values.post = ''
                setSubmitting(false)
            }}
        >
            {({
                  values,
                  handleChange,
                  handleSubmit,
                  isSubmitting
              }) => (
                <form onSubmit={handleSubmit} className={s.profileInfoSection}>
                    <div className={s.textareaContainer}>
                        <AutoSizeTextarea sharedProps={{
                            name: 'post',
                            onChange: handleChange,
                            value: values.post,
                            placeholder: 'Что у вас нового?',
                            style: {flexGrow: 2, marginBottom: 10},
                            maxLength: 200,
                            autoSize: {minRows: 1}
                        }}
                        />
                    </div>
                    <Button htmlType='submit' disabled={isSubmitting || !values.post}>
                        Опубликовать
                    </Button>
                </form>
            )}
        </Formik>
    )
}


