import { combineReducers } from 'redux'
import calls from './calls'
//Combine Reducers
const callsApp = combineReducers({
    calls
})

export default callsApp;
