const ADD_MESSAGE = "DIALOGS_ADD-MESSAGE";
const REMOVE_MESSAGE = "DIALOGS_REMOVE_MESSAGE";

type userType = {
    date: dateType
    messages: Array<userMessagesType>
}
type dateType = {
    userId: number
    userName: string
    photo: string
}
type userMessagesType = {
    id: number
    message: string
    isMe: boolean
}
export type initialStateType = {
    dialogs: Map<number, userType>
}
let initialState: initialStateType = {
    dialogs: new Map([
        [1, {
            date: {userId: 1, userName: "Саша Петров", photo: "https://archilab.online/images/1/123.jpg"},
            messages: [
                {id: 1, message: "Обязан древнеримскому философу цицерону, ведь именно из его применили", isMe: false},
                {id: 2, message: "Так как цель применения такого текста на кириллический", isMe: true},
                {id: 3, message: "Латыни и смысловую нагрузку", isMe: false},
            ],
        }],
        [2, {
            date: {
                userId: 2,
                userName: "Дима Глазырин",
                photo: "https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg"
            },
            messages: [
                {id: 1, message: "Трактата, благодаря чему появляется возможность получить более", isMe: false},
                {id: 2, message: "Самым известным рыбным текстом является знаменитый lorem", isMe: true},
                {id: 3, message: "Создающие собственные варианты текста сыграет на руку", isMe: false},
            ],
        }],
        [3, {
            date: {userId: 3, userName: "Саша Варламов", photo: "https://www.photoshop-master.ru/lessons/les989/2.jpg"},
            messages: [
                {id: 1, message: "И на основе оригинального трактата, благодаря чему", isMe: false},
                {
                    id: 2,
                    message: "Отсюда напрашивается вывод, что все же лучше использовать в книгопечатании",
                    isMe: true
                },
                {
                    id: 3,
                    message: "Даже с языками, использующими латинский алфавит, могут возникнуть небольшие",
                    isMe: true
                },
                {
                    id: 4,
                    message: "Появлением lorem ipsum на руку при оценке качества восприятия макета как цель",
                    isMe: false
                },
            ],
        }],
        [4, {
            date: {
                userId: 4,
                userName: "Наташа Самоделкина",
                photo: "https://klike.net/uploads/posts/2019-03/1551511801_1.jpg"
            },
            messages: [
                {
                    id: 1,
                    message: "Рыбным текстом является знаменитый lorem ipsum на интернет-страницы и проектах",
                    isMe: false
                },
                {id: 2, message: "Смысловую нагрузку ему нести совсем необязательно ipsum", isMe: true},
                {id: 3, message: "Распространенных слов получив текст-рыбу, широко используемый", isMe: false},
            ],
        }],
        [5, {
            date: {
                userId: 5,
                userName: "Валера Иванов",
                photo: "https://klike.net/uploads/posts/2019-03/medium/1551512888_2.jpg"
            },
            messages: [
                {id: 1, message: "Качества восприятия макета разница в книгопечатании еще в xvi веке", isMe: false},
                {
                    id: 2,
                    message: "Алфавит, могут возникнуть небольшие проблемы: в различных языках те или иные буквы",
                    isMe: true
                },
                {id: 3, message: "Возникают некоторые вопросы, связанные с языками использующими", isMe: false},
            ],
        }],
        [6, {
            date: {
                userId: 6,
                userName: "Сергей Князев",
                photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpb1pGksOU5tA2fFEjLLQellOF_GmMJIAbAQ&usqp=CAU"
            },
            messages: [
                {
                    id: 1,
                    message: "Является знаменитый lorem отношения к обитателям водоемов с разной частотой",
                    isMe: false
                },
                {
                    id: 2,
                    message: "Отношения к обитателям водоемов демонстрации внешнего вида контента просмотра",
                    isMe: false
                },
                {
                    id: 3,
                    message: "Получив текст-рыбу, широко используемый и т.д используется он веб-дизайнерами для вставки",
                    isMe: true
                },
                {id: 4, message: "Что все же лучше использовать при оценке", isMe: true},
            ],
        }],
    ])
}

const dialogsReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            if (state.dialogs.has(action.activeDialog)) {
                let currentUser = {...state.dialogs.get(action.activeDialog)} as userType
                currentUser.messages = [...currentUser.messages, {
                    id: currentUser.messages.length + 1,
                    message: action.message, isMe: true
                }]
                let newState: initialStateType = {
                    ...state,
                    dialogs: new Map(state.dialogs)
                }
                newState.dialogs.set(action.activeDialog, currentUser)
                return newState
            }
            return state
        case REMOVE_MESSAGE:
            if (state.dialogs.has(action.activeDialog)) {
                let currentUser = {...state.dialogs.get(action.activeDialog)} as userType
                currentUser.messages = [...currentUser.messages.filter(m => m.id !== action.id)]
                let newState: initialStateType = {
                    ...state,
                    dialogs: new Map(state.dialogs)
                }
                newState.dialogs.set(action.activeDialog, currentUser)
                return newState
            }
            return state
        default:
            return state;
    }
}

type addMessageType = {
    type: typeof ADD_MESSAGE
    message: string
    activeDialog: number
}
export const addMessage = (message: string, activeDialog: number): addMessageType => ({
    type: ADD_MESSAGE,
    message,
    activeDialog
})

type removeMessageType = {
    type: typeof REMOVE_MESSAGE
    activeDialog: number
    id: number
}
export const removeMessage = (activeDialog: number, id: number): removeMessageType => ({
    type: REMOVE_MESSAGE,
    activeDialog,
    id
})

export default dialogsReducer;