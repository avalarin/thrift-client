import './app.global.css'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'primer-css/build/index'

import configureStore from './store'

import Main from './pages/main'

const store = configureStore()

window.store = store

render(
  <Provider store={store}>
    <Main />
  </Provider>, 
  document.getElementById('app')
)