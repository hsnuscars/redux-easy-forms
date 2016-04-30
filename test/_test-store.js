import { combineReducers, createStore  } from 'redux';
import { REFormsReducer } from '../src/index';
import { initFormsAction } from '../src/REFormsActions';
import { libData } from './_test-data';

// set up Redux test store
const rootReducer = combineReducers({ REForms: REFormsReducer });
const store = createStore( rootReducer );

// initialize store with REForms data
store.dispatch( initFormsAction( libData.data, libData.fns ) );

export const testStore = store;
