// CSS / SASS
require( './styles/stylesheet.scss' );              // <-- ???

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore  } from 'redux';

import App from './App';
import { REFormsReducer } from '../index';             // <--

// Redux Store
const rootReducer = combineReducers({
  REForms: REFormsReducer                           // <--
  // any of your other reducers...
});

const createStoreWithMiddleware = compose(
  // add any middleware...
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
 )( createStore );

const store = createStoreWithMiddleware( rootReducer );

// App
ReactDOM.render((
  <div>
    <Provider store={ store } >
      <App/>
    </Provider>
  </div>
), document.getElementById( 'app' ) );
