import express from 'express'
import serialize from 'serialize-javascript'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import routes from './src/routes'
import reducer from './src/reducers'
var cors = require('cors');
var proxy = require('http-proxy-middleware');
/* SocketIO connection */
let socket = io('http://172.24.10.3:8080/');
let socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

/* Middlewares Concat */
let middlewares = [thunkMiddleware,socketIoMiddleware];
/* Express server creation */
const app = express()
app.use('/public', express.static(__dirname + '/public'))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const crosAPIUrl = 'http://172.24.10.3:8080'
var options = {
        target: crosAPIUrl, // target host 
        changeOrigin: true, // needed for virtual hosted sites        
    };
var newProxy = proxy(options);
app.use('/lastcalls', newProxy);
app.use('/phonedirectory', newProxy);
app.use('/externalphonedirectory', newProxy);
app.use('/call', newProxy);
app.use('/calls', newProxy);
app.use('/scpost', newProxy);
app.use('/updatephone', newProxy);
app.use('/makeexternalphone', newProxy);
app.use('/searchexternalcall', newProxy);
app.use('/mcphone', newProxy);
app.use('/topdurationcalls', newProxy);
app.use('/authuser', newProxy);

/* configure store */
function configureStore(memoryHistory, initialState){
    let store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(...middlewares, routerMiddleware(memoryHistory))
        )
    )
    return store
}

const HTML = ({ content, store }) => (
  <html>
    <head>
      <title>Hotel Plaza Meru | Phone Register Client</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.css"/>
      <link rel='stylesheet' type='text/css' href='public/style.css' />
    </head>
    <body>
      <div id='app' dangerouslySetInnerHTML={{ __html: content }}/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
      <script src="//code.jquery.com/jquery-2.2.4.min.js"></script>
      <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
      <script src='public/vendor.js' />
      <script src='public/bundle.js' />
    </body>
  </html>
)

/* react router */
app.use(function (req, res) {
  const memoryHistory = createMemoryHistory(req.path)
  let store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)
  /* react router match history */
  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      )

      res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))
    }
  })
})
app.listen(8081, function (err) {
    if (err) { console.log(err); return; }
    console.log('Server listening on http://localhost:8081, Ctrl+C to stop')
})