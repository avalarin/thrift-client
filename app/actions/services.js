import { createAction } from 'redux-actions'
import ServicesLoader from '~/core/ServicesLoader'

const servicesLoader = new ServicesLoader();

export const SAVE_SELECTED_TEMP_SERVICES = 'SAVE_SELECTED_TEMP_SERVICES'
export const BEGIN_LOADING_TEMP_SERVICES = 'BEGIN_LOADING_TEMP_SERVICES'
export const COMPLETE_LOADING_TEMP_SERVICES = 'COMPLETE_LOADING_TEMP_SERVICES'
export const SELECT_TEMP_SERVICE = 'SELECT_TEMP_SERVICE'

export const saveSelectedTempServices = createAction(SAVE_SELECTED_TEMP_SERVICES)
export const beginLoadingTempServices = createAction(BEGIN_LOADING_TEMP_SERVICES)
export const complateLoadingTempServices = createAction(COMPLETE_LOADING_TEMP_SERVICES)
export const selectTempService = createAction(SELECT_TEMP_SERVICE)

export function loadTempServices(url) {
    return dispatch => {
        dispatch(beginLoadingTempServices())
        servicesLoader.list(url)
            .then(services => dispatch(complateLoadingTempServices({ items: services })))
            .catch(error => dispatch(complateLoadingTempServices({ error: error })))
    };
};