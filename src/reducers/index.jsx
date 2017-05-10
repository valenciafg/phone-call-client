import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import calls from './calls';
import auth from './auth';
//Combine Reducers
const callsApp = combineReducers({
    calls,
    auth,
    routing: routerReducer,
})

export default callsApp;
