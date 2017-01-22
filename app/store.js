import { createStore, applyMiddleware, compose } from 'redux'
import settings from 'electron-settings'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { setServices } from '~/actions/services'
import reducers from './reducers/index'

settings.defaults({
  services: []
});

const loggerMiddleware = createLogger()

const configMiddleware = store => next => action => {
    let result = next(action)

    let services = store.getState().services.get('list').toJS()

    settings.set('services', services)

    return result
}

let middlewares = applyMiddleware(thunkMiddleware, loggerMiddleware, configMiddleware)

if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    middlewares = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middlewares)
}

export default function configureStore() {
    let store = createStore(reducers, {}, middlewares)

    settings.get('services').then(services => {
        store.dispatch(setServices(services))
    })

    return store
}