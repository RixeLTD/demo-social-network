import authReducer, {authActions, getCaptcha, getUserData, InitialStateType, loginUser, logoutUser} from './auth-reduces'
import {authAPI, profileAPI, AuthMeType, ResponseDataType, ResultCodes, AuthLoginType} from '../api/api'
import {profile} from './profile-reduces.test'
import {isBoolean} from 'util'

let state: InitialStateType

beforeEach(() => {
    state = {
        userId: null,
        email: null,
        login: null,
        fullName: null,
        photo: null,
        isAuth: false,
        isCaptcha: '',
        errorMessage: null,
        isFetching: false
    }
})

test('set user auth data', () => {

    const newState = authReducer(state, authActions.setUserData(2, 'email', 'login', 'fullName', 'photo', true))

    expect(newState.userId).toBe(2)
    expect(newState.email).toBe('email')
    expect(newState.login).toBe('login')
    expect(newState.fullName).toBe('fullName')
    expect(newState.photo).toBe('photo')
    expect(newState.isAuth).toBeTruthy()
})
test('set captcha', () => {

    const newState = authReducer(state, authActions.setCaptcha('CAPTCHA'))

    expect(newState.isCaptcha).toBe('CAPTCHA')
})
test('set login form error', () => {

    const newState = authReducer(state, authActions.setLoginFormErrors('Error'))

    expect(newState.errorMessage).toBe('Error')
})
//---------------------------------------------------------------------------
jest.mock('../api/api')
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>
const result: ResponseDataType & AuthMeType = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {
        id: 50,
        email: 'email 50',
        login: 'login 50'
    }
}

const dispatchMock = jest.fn()
const getState = jest.fn()

test('get user data', async () => {
    authAPIMock.me.mockReturnValue(Promise.resolve(result))
    profileAPIMock.getProfile.mockReturnValue(Promise.resolve(profile))
    const thunk = getUserData()

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(
        1, authActions.setUserData(result.data.id, result.data.email,
            result.data.login, profile.fullName, profile.photos.small, true))
})
test('get captcha', async () => {
    authAPIMock.getCaptcha.mockReturnValue(Promise.resolve('captcha'))

    const thunk = getCaptcha()

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(1)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, authActions.setCaptcha('captcha'))
})
test('login user', async () => {

    const result: ResponseDataType & AuthLoginType = {
        resultCode: ResultCodes.Success,
        messages: [],
        data: {
            userId: 10
        }
    }
    const loginData = {
        email: 'email',
        password: 'password',
        rememberMe: true,
        captcha: 'captcha'
    }
    authAPIMock.login.mockReturnValue(Promise.resolve(result))

    const thunk = loginUser(loginData)

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, authActions.setLoginFormErrors(null))
    // expect(dispatchMock).toHaveBeenNthCalledWith(2, getUserData())
    expect(dispatchMock).toHaveBeenNthCalledWith(3, authActions.setCaptcha(''))
})
test('logout user', async () => {

    const result: ResponseDataType = {
        resultCode: ResultCodes.Success,
        messages: [],
        data: {}
    }

    authAPIMock.logout.mockReturnValue(Promise.resolve(result))

    const thunk = logoutUser()

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(2)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, authActions.setUserData(null, null, null, null, null, false))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, authActions.setLoginFormErrors(null))
})