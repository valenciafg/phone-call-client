import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSocketIoMiddleware from 'redux-socket.io';
import thunk from 'redux-thunk'

import io from 'socket.io-client';

import reducer from './reducers';
import App from './containers/App';

let socket = io('<server ip>');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

let middlewares = [thunk,socketIoMiddleware];


// const store = applyMiddleware(...middleWares)(createStore)(reducer);
const store = createStore(reducer,applyMiddleware(...middlewares));



let app = document.getElementById('app')
if(app != null ) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        , app);
}