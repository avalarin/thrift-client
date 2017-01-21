import { Map, List, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
// import * as actions from '../actions/services'

export default handleActions({
    SAVE_SELECTED_TEMP_SERVICES: (state, action) => {
        let selectedIndex = state.getIn(['temp', 'selected'])
        let selected = state.getIn(['temp', 'list', selectedIndex])
        return state.update('list', (services) => services.push(selected))
    },
    BEGIN_LOADING_TEMP_SERVICES: (state, action) => state.setIn(['temp', 'loading'], true)
                                                         .setIn(['temp', 'list'], List())
                                                         .setIn(['temp', 'error'], null)
                                                         .setIn(['temp', 'selected'], ),
    COMPLETE_LOADING_TEMP_SERVICES: (state, action) => state.setIn(['temp', 'loading'], false)
                                                            .setIn(['temp', 'list'], List(action.payload.items))
                                                            .setIn(['temp', 'error'], action.payload.error)  
                                                            .setIn(['temp', 'selected'], 0),
    SET_TEMP_URL: (state, action) => state.setIn(['temp', 'url'], action.payload),
    SELECT_TEMP_SERVICE: (state, action) => state.setIn(['temp', 'selected'], action.payload),

    EDIT_SERVICE: (state, action) => state.mergeIn(['edit'], fromJS({ service: action.payload.service, index: action.payload.index, type: action.payload.type })),
    SET_EDITING_SERVICE_FIELD: (state, action) => state.setIn(['edit', 'service', action.payload.field], action.payload.value),
    SAVE_EDITED_SERVICE: (state, action) => {
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
    list: [ ], 
    temp: { loading: false, list: [ ], error: null, selected: null, url: "/home/aprokopev/Desktop/thrift-models/thrift" },
    edit: { service: { source: '', name: '', server: '' }, index: null, type: null }
}))
