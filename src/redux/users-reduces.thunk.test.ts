import {followUnfollow, requestUsers, usersActions} from './users-reduces'
import {GetUsers, usersAPI} from '../api/api'
import {ResponseDataType, ResultCodes} from '../api/api'

jest.mock('../api/api')
let usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: ResponseDataType = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {}
}
const dispatchMock = jest.fn()
const getState = jest.fn()

test('follow thunk', async () => {
    usersAPIMock.followUser.mockReturnValue(Promise.resolve(result))
    const thunk = followUnfollow(1, 'following')

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.followUnfollowSuccess(1, 'following'))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowing(false, 1))
})

test('unfollow thunk', async () => {
    usersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result))
    const thunk = followUnfollow(1, 'unfollowing')

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.followUnfollowSuccess(1, 'unfollowing'))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowing(false, 1))
})
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
    totalCount: 150,
    error: null
}
test('request users', async () => {
    usersAPIMock.getUsers.mockReturnValue(Promise.resolve(responseUsers))
    const thunk = requestUsers(2, 10)

    await thunk(dispatchMock, getState, {})

    expect(dispatchMock).toBeCalledTimes(5)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.setCurrentPage(2))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.toggleIsFetching(true))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.setUsers(responseUsers.items))
    expect(dispatchMock).toHaveBeenNthCalledWith(4, usersActions.toggleIsFetching(false))
    expect(dispatchMock).toHaveBeenNthCalledWith(5, usersActions.setTotalUsersCount(responseUsers.totalCount))
})

