const ADD_MESSAGE = "DIALOGS_ADD-MESSAGE";

export const addMessageCreator = (message) => ({type: ADD_MESSAGE, message})

let initialState = {
    dialogs: [
        {id: 1, name: 'Roman', image: 'https://archilab.online/images/1/123.jpg'},
        {id: 2, name: 'Valera', image: 'https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg'},
        {id: 3, name: 'Dima', image: 'https://www.photoshop-master.ru/lessons/les989/2.jpg'},
        {id: 4, name: 'Sasha', image: 'https://pbs.twimg.com/media/D8r-PBWWsAEXTfK.jpg'},
        {id: 5, name: 'Oleg', image: 'https://f1.upet.com/A_r2u6uZhnxA_x.jpg'},
        {id: 6, name: 'Sveta', image: 'https://shapka-youtube.ru/wp-content/uploads/2019/08/bulldog-img.jpg'},
    ],
    messages: [
        {id: 1, message: 'Hi', isMe: 1},
        {id: 2, message: 'How is your it?', isMe: 0},
        {id: 3, message: 'bye', isMe: 1},
        {id: 4, message: 'byyyyyyyyyyyye', isMe: 0},
    ],
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {id: state.messages.length + 1, message: action.message, isMe: Math.floor(Math.random() * 2),}],
            };
        default:
            return state;
    }
}

export default dialogsReducer;