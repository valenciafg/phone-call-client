import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import calls from './calls'
//Combine Reducers
const callsApp = combineReducers({
    calls,
    routing: routerReducer,
})

export default callsApp;
