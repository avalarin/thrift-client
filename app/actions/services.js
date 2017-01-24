import { createAction } from 'redux-actions'
import ServicesLoader from '~/core/ServicesLoader'
import { showModal, hideModal, EDIT_SERVICE_MODAL } from '~/actions/modals'
import { addItem, SERVICE_TABS } from '~/actions/lists'

const servicesLoader = new ServicesLoader();

export const SET_EDITING_SERVICE_FIELD = 'SET_EDITING_SERVICE_FIELD'

export const setServices = createAction('SET_SERVICES')
export const selectService = createAction('SELECT_SERVICE')

export const beginLoadingTempServices = createAction('BEGIN_LOADING_TEMP_SERVICES')
export const complateLoadingTempServices = createAction('COMPLETE_LOADING_TEMP_SERVICES')
export const selectTempService = createAction('SELECT_TEMP_SERVICE')
export const setTempUrl = createAction('SET_TEMP_URL')

export function loadTempServices() {
    return function (dispatch, getState) {
        dispatch(beginLoadingTempServices())
        let url = getState().services.getIn(['temp', 'url'])
        servicesLoader.list(url)
            .then(services => dispatch(complateLoadingTempServices({ items: services })))
            .catch(error => dispatch(complateLoadingTempServices({ error: error })))
    }
}

const editServiceInternal = createAction('EDIT_SERVICE')
const saveEditedServiceInternal = createAction('SAVE_EDITED_SERVICE')

export function editService(service) {
    return function (dispatch) {
        dispatch(showModal(EDIT_SERVICE_MODAL))
        dispatch(editServiceInternal(service))
    }
}
export function editSelectedService() {
    return function (dispatch, getState) {
        let state = getState().services
        let selectedIndex = state.getIn(['selected'])
        let selected = state.getIn(['list', selectedIndex])
        dispatch(editService({ service: selected, type: 'exist', index: selectedIndex }))
    }
}
export function editSelectedTempService() {
    return function (dispatch, getState) {
        let state = getState().services
        let selectedIndex = state.getIn(['temp', 'selected'])
        let selected = state.getIn(['temp', 'list', selectedIndex])
        dispatch(editService({ service: selected, type: 'new' }))
    }
}
export function saveEditedService() {
    return function (dispatch, getState) {
        dispatch(hideModal(EDIT_SERVICE_MODAL))
        dispatch(saveEditedServiceInternal())
    }
}
export const setEditingServiceField = createAction('SET_EDITING_SERVICE_FIELD')

export function createTabForSelectedService() {
    return function (dispatch, getState) {
        let state = getState().services
        let selectedIndex = state.getIn(['selected'])
        let selected = state.getIn(['list', selectedIndex]).toJS()
        dispatch(addItem({ list: SERVICE_TABS, item: { service: selected, name: selected.name }}))
    }
}