import './app.global.css'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import 'primer-css/build/index'

import configureStore from './store'

import MainPage from './components/pages/MainPage'

import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
[REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS].forEach(devtools => {
    installExtension(devtools)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
})

const store = configureStore()

window.store = store

render(
  <Provider store={store}>
    <MainPage />
  </Provider>, 
  document.getElementById('app')
)