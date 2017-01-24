import { Map, List, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

export default handleActions({
    SET_SERVICES: function (state, action) {
        return state.merge(fromJS({ list: action.payload, selected: 0 }))
    },
    SELECT_SERVICE: function (state, action) {
        return state.set('selected', action.payload.index)  
    },

    SAVE_SELECTED_TEMP_SERVICES: function (state, action) {
        let selectedIndex = state.getIn(['temp', 'selected'])
        let selected = state.getIn(['temp', 'list', selectedIndex])
        return state.update('list', (services) => services.push(selected))
    },
    BEGIN_LOADING_TEMP_SERVICES: function (state, action) {
        return state.mergeIn(['temp'], fromJS({loading: true, list: [], error: null, selected: 0}))
    },
    COMPLETE_LOADING_TEMP_SERVICES: function (state, { payload: { items, error } }) {
        return state.mergeIn(['temp'], fromJS({loading: false, list: items, error: error, selected: 0}))
    },
    SET_TEMP_URL: function (state, action) {
        return state.setIn(['temp', 'url'], action.payload)
    },
    SELECT_TEMP_SERVICE: function (state, action) { 
        return state.setIn(['temp', 'selected'], action.payload)
    },

    EDIT_SERVICE: function (state, action) {
        return state.mergeIn(['edit'], fromJS({ service: action.payload.service, index: action.payload.index, type: action.payload.type })) 
    },
    SET_EDITING_SERVICE_FIELD: function (state, action) {
        return state.setIn(['edit', 'service', action.payload.field], action.payload.value)
    },
    SAVE_EDITED_SERVICE: function (state, action) {
        let edit = state.get('edit')
        let service = edit.get('service').toJS()
        let index = edit.get('index')
        let type = edit.get('type')

        if (type == 'new') {
            return state.update('list', services => services.push(service))
        } else {
            return state.update('list', services => services.set(index, service))
        }
    }
}, fromJS({ 
    list: [ ], selected: 0,
    temp: { loading: false, list: [ ], error: null, selected: null, url: "" },
    edit: { service: { source: '', name: '', server: '' }, index: null, type: null }
}))
