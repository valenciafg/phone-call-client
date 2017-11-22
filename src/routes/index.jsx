import React from 'react'
import { IndexRoute, Route, Link, IndexRedirect, Redirect } from 'react-router'
import { createStore } from 'redux'
/* Import component containers */
import App from '../containers/App'
import ExtensionSearch from '../containers/ExtensionSearch'
import OnlineCalls from '../containers/OnlineCalls'
import DateSearch from '../containers/DateSearch'
import NameSearch from '../containers/NameSearch'
import PhoneDirectory from '../containers/PhoneDirectory'
import ExternalPhoneDirectory from '../containers/ExternalPhoneDirectory'
import Login from '../containers/Login'
import rootReducer from '../reducers'

const store = createStore(rootReducer)
const myState = store.getState()
const loggedIn = myState.auth.loggedin
const routes = (
    <Route path="/" component={App}>
        <IndexRoute  component={loggedIn ? OnlineCalls : PhoneDirectory} />
        <Route path="login" component={Login} />
        <Route path="extension" component={ExtensionSearch} />
        <Route path="name" component={NameSearch} />
        <Route path="directory" component={PhoneDirectory} />
        <Route path="extdirectory" component={ExternalPhoneDirectory} />
        <Route path="date" component={DateSearch} />
    </Route>
)

export default routes