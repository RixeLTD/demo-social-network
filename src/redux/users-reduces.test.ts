import usersReducer, {InitialStateType, usersActions} from './users-reduces'
import {UserType} from '../types/types'

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [
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
            },
            {
                id: 2,
                name: 'user 2',
                followed: true,
                status: 'status 2',
                photos: {
                    small: null,
                    large: null
                }
            },
            {
                id: 3,
                name: 'user 3',
                followed: true,
                status: 'status 3',
                photos: {
                    small: null,
                    large: null
                }
            }
        ],
        searchUsers: [],
        pageSize: 10,
        totalUsersCount: 0,
        totalSearchUsersCount: 0,
        currentPage: 1,
        currentSearchPage: 1,
        isFetching: true,
        followingInProgress: [] // array of users id
    }
})

test('follow success', () => {

    const newState = usersReducer(state, usersActions.followUnfollowSuccess(1, 'following'))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test('unfollow success', () => {

    const newState = usersReducer(state, usersActions.followUnfollowSuccess(3, 'unfollowing'))

    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
})
test('set users', () => {
    const users: Array<UserType> = [
        {
            id: 4,
            name: 'user 4',
            followed: false,
            status: 'status 4',
            photos: {
                small: null,
                large: null
            }
        },
        {
            id: 5,
            name: 'user 5',
            followed: false,
            status: 'status 5',
            photos: {
                small: null,
                large: null
            }
        },
        {
            id: 6,
            name: 'user 6',
            followed: true,
            status: 'status 6',
            photos: {
                small: null,
                large: null
            }
        },
        {
            id: 7,
            name: 'user 7',
            followed: true,
            status: 'status 7',
            photos: {
                small: null,
                large: null
            }
        }
    ]
    const newState = usersReducer(state, usersActions.setUsers(users.reverse()))

    expect(newState.users[0].id).toBe(0)
    expect(newState.users[6].id).toBe(6)
})
test('set current page', () => {

    const newState = usersReducer(state, usersActions.setCurrentPage(3))

    expect(newState.currentPage).toBe(3)
})
test('set total users count', () => {

    const newState = usersReducer(state, usersActions.setTotalUsersCount(150))

    expect(newState.totalUsersCount).toBe(150)
})
test('toggle is fetching', () => {

    const newState = usersReducer(state, usersActions.toggleIsFetching(true))

    expect(newState.isFetching).toBeTruthy()
})
test('toggle following', () => {

    let newState = usersReducer(state, usersActions.toggleFollowing(true, 15))
    expect(newState.followingInProgress).toEqual([15])

    newState = usersReducer(newState, usersActions.toggleFollowing(true, 14))
    expect(newState.followingInProgress).toEqual([15, 14])

    newState = usersReducer(newState, usersActions.toggleFollowing(false, 14))
    newState = usersReducer(newState, usersActions.toggleFollowing(false, 15))
    expect(newState.followingInProgress).toEqual([])
})
