import profileReducer, {addPostCreator} from "./profile-reducer";


let state = {
    posts: [
        {id: '1', message: 'How are you?', likesCount: 0},
        {id: '2', message: 'It\'s my first posts', likesCount: 26},
        {id: '3', message: 'yesssss', likesCount: 26},
        {id: '4', message: 'noooooo', likesCount: 26},
    ]
}

it('posts length should be increment ', () => {
    let action = addPostCreator('12345');

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(5);
});

it('new message should be correct ', () => {
    let action = addPostCreator('12345');

    let newState = profileReducer(state, action);

    expect(newState.posts[4].message).toBe('12345');
});