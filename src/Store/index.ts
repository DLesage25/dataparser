import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import reduxPromise from 'redux-promise';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from './reducers';

export const history = createBrowserHistory();

const logger = createLogger({
    level: 'info',
    collapsed: true,
});

const middlewares = applyMiddleware(
    reduxPromise,
    promiseMiddleware,
    routerMiddleware(history),
    thunkMiddleware,
    logger
);

const store =
    process.env.NODE_ENV === 'production'
        ? createStore(rootReducer(history), middlewares)
        : createStore(rootReducer(history), composeWithDevTools(middlewares));

export type RootState = ReturnType<ReturnType<typeof rootReducer>>;

export default store;
