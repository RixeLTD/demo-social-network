import profileReducer, {InitialStateType, profileActions} from './profile-reducer'

let state: InitialStateType

beforeEach(() => {
    state = {
        posts: [
            {
                id: 1,
                message: 'Вопросы, связанные с использованием lorem. Иные буквы встречаются с использованием lorem основе оригинального трактата благодаря',
                likesCount: 0
            },
            {
                id: 2,
                message: 'Веб-дизайнерами для вставки на сайтах и смысловую нагрузку ему нести совсем необязательно',
                likesCount: 26
            }
        ],
        counter: 2,
        profile: null,
        status: '',
        errorMessage: null,
        isSubmittingSuccess: false,
        isFetching: false
    }
})

test('add post', () => {

    const newState = profileReducer(state, profileActions.addPost('new post'))

    expect(newState.posts[2].message).toBe('new post')
    expect(newState.posts[2].id).toBe(3)
    expect(newState.posts[1].message).toBe('Веб-дизайнерами для вставки на сайтах и смысловую нагрузку ему нести совсем необязательно')
})
test('remove post', () => {

    const newState = profileReducer(state, profileActions.removePost(1))

    expect(newState.posts[0].message).toBe('Веб-дизайнерами для вставки на сайтах и смысловую нагрузку ему нести совсем необязательно')
    expect(newState.posts[0].id).toBe(2)
})

export const profile = {
    userId: 50,
    lookingForAJob: true,
    lookingForAJobDescription: 'looking',
    fullName: 'user 50',
    contacts: {
        github: 'github',
        vk: 'vk',
        facebook: 'facebook',
        instagram: 'instagram',
        twitter: 'twitter',
        website: 'website',
        youtube: 'youtube',
        mainLink: 'mainLink'
    },
    photos: {
        large: 'large 50',
        small: 'small 50'
    },
    aboutMe: 'about me 50'
}
test('set user profile', () => {

    const newState = profileReducer(state, profileActions.setUserProfile(profile))

    expect(newState.profile).toBe(profile)
})
test('set user status', () => {

    const newState = profileReducer(state, profileActions.setUserStatus('status'))

    expect(newState.status).toBe('status')
})
const photos = {
    large: 'large',
    small: 'small'
}
test('set user photos', () => {

    const newState = profileReducer(state, profileActions.setUserPhoto(photos))

    expect(newState.profile?.photos).toBe(photos)
})
test('set profile form error', () => {

    const newState = profileReducer(state, profileActions.setProfileFormErrors('error'))

    expect(newState.errorMessage).toBe('error')
})
test('set submitting success', () => {

    const newState = profileReducer(state, profileActions.setSubmittingSuccess(true))

    expect(newState.isSubmittingSuccess).toBe(true)
})
