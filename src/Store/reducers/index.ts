import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { History } from 'history';

import fileReducer from './fileReducer';

const rootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        fileReducer,
    });

export default rootReducer;
