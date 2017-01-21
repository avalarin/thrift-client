import { Map, List, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { ADD_SERVICES, BEGIN_LOADING_TEMP_SERVICES, COMPLETE_LOADING_TEMP_SERVICES, SELECT_TEMP_SERVICE } from '../actions/services'

export default handleActions({
    SAVE_SELECTED_TEMP_SERVICES: (state, action) => {
        let selectedIndex = state.getIn(['temp', 'selected'])
        let selected = state.getIn(['temp', 'list', selectedIndex])
        return state.update('list', (services) => services.push(selected))
    },
    BEGIN_LOADING_TEMP_SERVICES: (state, action) => state.setIn(['temp', 'loading'], true)
                                                         .setIn(['temp', 'list'], List())
                                                         .setIn(['temp', 'error'], null)
                                                         .setIn(['temp', 'selected'], 0),
    COMPLETE_LOADING_TEMP_SERVICES: (state, action) => state.setIn(['temp', 'loading'], false)
                                                            .setIn(['temp', 'list'], List(action.payload.items))
                                                            .setIn(['temp', 'error'], action.payload.error)  
                                                            .setIn(['temp', 'selected'], 0),
    SELECT_TEMP_SERVICE: (state, action) => state.setIn(['temp', 'selected'], action.payload)
}, fromJS({ list: [ ], temp: { loading: false, list: [ ], error: null, selected: null } }))
