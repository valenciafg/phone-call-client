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
    //Middleware concat
    let middlewares = [thunk,socketIoMiddleware];

    // const store = applyMiddleware(...middleWares)(createStore)(reducer);
    const store = createStore(rootReducer,applyMiddleware(...middlewares));

    // sincronizamos el browserHistory de React Router con el Store
    const history = syncHistoryWithStore(browserHistory, store);

    let app = document.getElementById('app')
    if(app != null ) {
        ReactDOM.render(
            <Provider store={store}>
                {/*le decimos al Router que use nuestro history sincronizado*/}
                <Router history={history}>
                {/*armamos las rutas de nuestra aplicación*/}
                    <Route path="/" component={App}>
                        <IndexRoute component={OnlineCalls} />
                        <Route path="extension" component={ExtensionSearch} />
                        <Route path="directory" component={PhoneDirectory} />
                        <Route path="date" component={DateSearch} />
                    </Route>
                </Router>
            </Provider>
            , app);
    }
