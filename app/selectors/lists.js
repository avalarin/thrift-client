import { List } from 'immutable'

export function getItems(state, listName) {
    return state.lists.getIn([listName, 'items'], List()).toJS()
}

export function getSelectedIndex(state, listName) {
    return state.lists.getIn([listName, 'index'], 0)
}

export function getSelectedItem(state, listName) {
    let index = getSelectedIndex(state, listName)
    let items = getItems(state, listName)
    return items[index]
}

export function isLoading(state, listName) {
    return state.lists.getIn([listName, 'loading'], false)
}