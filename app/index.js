import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';

window.onload = function(){
  ReactDOM.render(<Main />, document.getElementById('app'))
}