import { Map, List, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

export default handleActions({
    SHOW_MODAL: (state, action) => state.setIn([action.payload, 'visible'], true),
    HIDE_MODAL: (state, action) => state.setIn([action.payload, 'visible'], false)
}, fromJS({ }))
