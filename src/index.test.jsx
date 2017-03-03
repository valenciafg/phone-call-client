//import express from 'express'
import React from 'react'
import { render } from 'react-dom'
//import { renderToString } from 'react-dom/server'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
//import useScroll from 'scroll-behavior/lib/useStandardScroll'
import { syncHistoryWithStore } from 'react-router-redux'
import createSocketIoMiddleware from 'redux-socket.io'
import thunk from 'redux-thunk'
import io from 'socket.io-client'
//require('./styles/main.css');
//Import Styles
require('bootstrap/dist/css/bootstrap.css')
require('bootstrap/dist/css/bootstrap-theme.css')
require('react-bootstrap-table/dist/react-bootstrap-table-all.min.css')
require('react-select2-wrapper/css/select2.css')

//Reducers
import rootReducer from './reducers';
/* Routes */
import routes from './routes'

let socket = io('<server ip>');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
//Middleware concat
let middlewares = [thunk,socketIoMiddleware];

// const store = applyMiddleware(...middleWares)(createStore)(reducer);
const store = createStore(rootReducer,applyMiddleware(...middlewares));

// sincronizamos el browserHistory de React Router con el Store
const history = syncHistoryWithStore(browserHistory, store);

let app = document.getElementById('app')
if(app != null ) {
    render(
        <Provider store={store}>
            <Router history={history} routes={routes}/>
        </Provider>
        , app);
}
