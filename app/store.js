import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from './reducers/index'

const loggerMiddleware = createLogger();

let middlewares = applyMiddleware(thunkMiddleware, loggerMiddleware)

if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    middlewares = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middlewares)
}

export default function configureStore(initialState) {
  return createStore(reducers, initialState, middlewares)
}