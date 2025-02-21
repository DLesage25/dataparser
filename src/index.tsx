import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Router } from 'react-router-dom';

import store, { history } from './Store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                {/* <Router history={history}> */}
                <App />
                {/* </Router> */}
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
