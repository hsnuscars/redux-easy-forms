require( './styles/stylesheet.scss' );

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { combineReducers, compose, createStore  } from 'redux';

import App from './App';
import AppContainer from './AppContainer';
import EmptyForm from './EmptyForm';
import { REFormsReducer } from '../index';          // <--

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
      <Router history={ hashHistory }>
        <Route path="/" component={ AppContainer }>
          <IndexRoute component={ App } />
          <Route path="main" component={ App } />
          <Route path="sub" component={ EmptyForm } />
        </Route>
      </Router>
    </Provider>

  </div>
), document.getElementById( 'app' ) );
