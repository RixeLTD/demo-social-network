import appReducer, {appActions, initializeApp, InitialStateType} from './app-reduces'
import {GetUsers, usersAPI} from '../api/api'
import {usersActions} from './users-reduces'
import {getUserData} from './auth-reduces'

let state: InitialStateType

beforeEach(() => {
    state = {
        initialized: false,
        globalError: null,
        isVisibleGlobalError: false
    }
})

test('initialized success', () => {

    const newState = appReducer(state, appActions.initializedSuccess())

    expect(newState.initialized).toBeTruthy()
    expect(newState.globalError).toBeNull()
    expect(newState.isVisibleGlobalError).toBeFalsy()
})
test('setting global error', () => {

    let newState = appReducer(state, appActions.setGlobalError("error"))

    expect(newState.initialized).toBeFalsy()
    expect(newState.globalError).toBe("error")
    expect(newState.isVisibleGlobalError).toBeFalsy()

    newState = appReducer(state, appActions.setGlobalError(null))
    expect(newState.globalError).toBeNull()
})
test('setting visible global error', () => {

    const newState = appReducer(state, appActions.setIsVisibleGlobalError(true))

    expect(newState.initialized).toBeFalsy()
    expect(newState.globalError).toBeNull()
    expect(newState.isVisibleGlobalError).toBeTruthy()
})

//---------------------------------------------------------------------------
jest.mock('../api/api')
let usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
jest.mock('./auth-reduces')
const responseUsers: GetUsers = {
    items: [
        {
            id: 0,
            name: 'user 0',
            followed: false,
            status: 'status 0',
            photos: {
                small: null,
                large: null
            }
        },
        {
            id: 1,
            name: 'user1',
            followed: false,
            status: 'status 1',
            photos: {
                small: null,
                large: null
            }
        }
    ],
    totalCount: 200,
    error: null
}
const dispatchMock = jest.fn()
const getState = jest.fn()

test('initialize app', async () => {
    usersAPIMock.getUsers.mockReturnValue(Promise.resolve(responseUsers))
    const thunk = initializeApp()

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(2)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, getUserData())
    expect(dispatchMock).toHaveBeenNthCalledWith(2, appActions.initializedSuccess())
})