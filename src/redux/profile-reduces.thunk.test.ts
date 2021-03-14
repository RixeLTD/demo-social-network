import {profileAPI, ResponseDataType, ResultCodes} from '../api/api'
import {profile} from './profile-reduces.test'
import {getUserProfile, getUserStatus, profileActions, updateProfile, updateUserStatus} from './profile-reducer'

jest.mock('../api/api')
let profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>
const result: ResponseDataType = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {}
}
const dispatchMock = jest.fn()
const getState = jest.fn()

test('get user profile', async () => {
    profileAPIMock.getProfile.mockReturnValue(Promise.resolve(profile))
    const thunk = getUserProfile(50)

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, profileActions.setUserProfile(profile))
})
test('get user status', async () => {
    profileAPIMock.getStatus.mockReturnValue(Promise.resolve('status'))
    const thunk = getUserStatus(50)

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, profileActions.setUserStatus('status'))
})
test('update user status', async () => {
    profileAPIMock.updateStatus.mockReturnValue(Promise.resolve(result))
    const thunk = updateUserStatus('new status')

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, profileActions.setUserStatus('new status'))
})
const resultPhotos = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {
        photos: {
            small: 'small',
            large: 'large'
        }
    }
}
// test('update user photo', async () => {
//     profileAPIMock.updatePhoto.mockReturnValue(Promise.resolve(resultPhotos))
//     const thunk = updateUserPhoto("file")
//
//     await thunk(dispatchMock, getState, {})
//
//     expect(dispatchMock).toBeCalledTimes(1)
//     expect(dispatchMock).toHaveBeenNthCalledWith(1, profileActions.setUserPhoto(resultPhotos.data.photos))
// })
test('update user profile', async () => {
    profileAPIMock.updateProfile.mockReturnValue(Promise.resolve(result))
    const thunk = updateProfile(profile)

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(4)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, profileActions.setProfileFormErrors(null))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, profileActions.setSubmittingSuccess(true))
    // expect(dispatchMock).toHaveBeenNthCalledWith(3, getUserProfile(profile.userId))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, profileActions.setSubmittingSuccess(false))
})