import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import app from './reducers';
import {createPromise} from 'redux-promise-middleware';
import api from '../utils/api';
const PromiseStatus = {
  START: 'START',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const reduxPromise = createPromise({
  promiseTypeSuffixes: [
    PromiseStatus.START,
    PromiseStatus.SUCCESS,
    PromiseStatus.ERROR,
  ],
});

const reducer = combineReducers({app});
const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument({api: {...api}}), reduxPromise),
);
export default store;
