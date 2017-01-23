import { createAction } from 'redux-actions'

export const SERVICE_TABS = 'serviceTabs'

export const setItems = createAction('SET_ITEMS')
export const addItem = createAction('ADD_ITEM')
export const selectItem = createAction('SELECT_ITEM')
export const beginLoading = createAction('BEGIN_LOADING')
