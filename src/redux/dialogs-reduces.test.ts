import dialogsReducer, {dialogsActions, InitialStateType} from './dialogs-reducer'

let state: InitialStateType

beforeEach(() => {
    state = {
        dialogs: [
            {
                data: {userId: 1, userName: 'Саша Петров', photo: 'https://archilab.online/images/1/123.jpg'},
                messages: [
                    {id: 1, message: 'Обязан древнеримскому философу цицерону, ведь именно из его применили', isMe: false},
                    {id: 2, message: 'Так как цель применения такого текста на кириллический', isMe: true},
                    {id: 3, message: 'Латыни и смысловую нагрузку', isMe: false},
                ],
                counter: 3
            },

            {
                data: {
                    userId: 2,
                    userName: 'Дима Глазырин',
                    photo: 'https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg'
                },
                messages: [
                    {id: 1, message: 'Трактата, благодаря чему появляется возможность получить более', isMe: false},
                    {id: 2, message: 'Самым известным рыбным текстом является знаменитый lorem', isMe: true},
                    {id: 3, message: 'Создающие собственные варианты текста сыграет на руку', isMe: true},
                ],
                counter: 3
            }
        ]
    }
})

test('add message', () => {

    const newState = dialogsReducer(state, dialogsActions.addMessage('new message 2', 2))

    expect(newState.dialogs[1].messages[3].message).toBe('new message 2')
    expect(newState.dialogs[0].messages[2].message).toBe('Латыни и смысловую нагрузку')

})
test('remove message', () => {

    const newState = dialogsReducer(state, dialogsActions.removeMessage(1, 2))

    expect(newState.dialogs[0].messages[2].message).toBe('Создающие собственные варианты текста сыграет на руку')
    expect(newState.dialogs[1].messages[1].message).toBe('Латыни и смысловую нагрузку')

})
