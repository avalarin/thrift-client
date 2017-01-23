import { Map, List, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'

export default handleActions({
    BEGIN_LOADING: (state, { payload: { list, items } }) => state.setIn([list, 'loading'], 'true'),
    SET_ITEMS: (state, { payload: { list, items } }) => state.merge(list, fromJS({ items, loading: false })),
    ADD_ITEM: (state, { payload: { list, item } }) => state.updateIn([list, 'items'], List(), items => items.push(item)),
    SELECT_ITEM: (state, { payload: { list, index } }) => state.setIn([list, 'index'], index)
}, fromJS({}))
