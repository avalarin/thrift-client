import { combineReducers } from 'redux'
import services from './services'
import modals from './modals'
import lists from './lists'

export default combineReducers({
    services, modals, lists
})