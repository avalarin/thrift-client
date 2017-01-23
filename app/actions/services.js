import { createAction } from 'redux-actions'
import ServicesLoader from '~/core/ServicesLoader'
import { showModal, hideModal, EDIT_SERVICE_MODAL } from '~/actions/modals'
import { addItem, SERVICE_TABS } from '~/actions/lists'

const servicesLoader = new ServicesLoader();

export const SET_SERVICES = 'SET_SERVICES'
export const SELECT_SERVICE = 'SELECT_SERVICE'

export const BEGIN_LOADING_TEMP_SERVICES = 'BEGIN_LOADING_TEMP_SERVICES'
export const COMPLETE_LOADING_TEMP_SERVICES = 'COMPLETE_LOADING_TEMP_SERVICES'
export const SELECT_TEMP_SERVICE = 'SELECT_TEMP_SERVICE'
export const SET_TEMP_URL = 'SET_TEMP_URL'

export const EDIT_SERVICE = 'EDIT_SERVICE'
export const SAVE_EDITED_SERVICE = 'SAVE_EDITED_SERVICE'
export const SET_EDITING_SERVICE_FIELD = 'SET_EDITING_SERVICE_FIELD'

export const setServices = createAction(SET_SERVICES)
export const selectService = createAction(SELECT_SERVICE)

export const beginLoadingTempServices = createAction(BEGIN_LOADING_TEMP_SERVICES)
export const complateLoadingTempServices = createAction(COMPLETE_LOADING_TEMP_SERVICES)
export const selectTempService = createAction(SELECT_TEMP_SERVICE)
export const setTempUrl = createAction(SET_TEMP_URL)

export function loadTempServices() {
    return (dispatch, getState) => {
        dispatch(beginLoadingTempServices())
        let url = getState().services.getIn(['temp', 'url'])
        servicesLoader.list(url)
            .then(services => dispatch(complateLoadingTempServices({ items: services })))
            .catch(error => dispatch(complateLoadingTempServices({ error: error })))
    };
};

const editServiceInternal = createAction(EDIT_SERVICE)
const saveEditedServiceInternal = createAction(SAVE_EDITED_SERVICE)

export function editService(service) {
    return (dispatch) => {
        dispatch(showModal(EDIT_SERVICE_MODAL))
        dispatch(editServiceInternal(service))
    }
}
export function editSelectedService() {
    return (dispatch, getState) => {
        let state = getState().services
        let selectedIndex = state.getIn(['selected'])
        let selected = state.getIn(['list', selectedIndex])
        dispatch(editService({ service: selected, type: 'exist', index: selectedIndex }))
    }
}
export function editSelectedTempService() {
    return (dispatch, getState) => {
        let state = getState().services
        let selectedIndex = state.getIn(['temp', 'selected'])
        let selected = state.getIn(['temp', 'list', selectedIndex])
        dispatch(editService({ service: selected, type: 'new' }))
    }
}
export function saveEditedService() {
    return (dispatch, getState) => {
        dispatch(hideModal(EDIT_SERVICE_MODAL))
        dispatch(saveEditedServiceInternal())
    }
}
export const setEditingServiceField = createAction(SET_EDITING_SERVICE_FIELD)

export function createTabForSelectedService() {
    return (dispatch, getState) => {
        let state = getState().services
        let selectedIndex = state.getIn(['selected'])
        let selected = state.getIn(['list', selectedIndex]).toJS()
        dispatch(addItem({ list: SERVICE_TABS, item: { service: selected, name: selected.name }}))
    }
}