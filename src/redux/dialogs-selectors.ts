import {AppStateType} from "./redux-store";

export const getDialogs = (state: AppStateType) => {
    return state.messagesPage.dialogs
}
