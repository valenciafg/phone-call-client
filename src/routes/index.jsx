import React from 'react'
import { IndexRoute, Route, Link, IndexRedirect, Redirect } from 'react-router'
import { createStore } from 'redux'
/* Import component containers */
import App from '../containers/App'
import Index from '../containers/Index'
import ExtensionSearch from '../containers/ExtensionSearch'
import OnlineCalls from '../containers/OnlineCalls'
import DateSearch from '../containers/DateSearch'
import NameSearch from '../containers/NameSearch'
import ExternalSearch from '../containers/ExternalSearch'
import PhoneDirectory from '../containers/PhoneDirectory'
import ExternalPhoneDirectory from '../containers/ExternalPhoneDirectory'
import MoreCalledPhone from '../containers/MoreCalledPhone'
import MoreDurationCalls from '../containers/MoreDurationCalls'
import Login from '../containers/Login'

const routes = (
    <Route path="/" component={App}>
        <IndexRoute  component={Index} />
        <Route path="login" component={Login} />
        <Route path="extension" component={ExtensionSearch} />
        <Route path="name" component={NameSearch} />
        <Route path="extname" component={ExternalSearch} />
        <Route path="directory" component={PhoneDirectory} />
        <Route path="extdirectory" component={ExternalPhoneDirectory} />
        <Route path="mcphone" component={MoreCalledPhone} />
        <Route path="topdurationcalls" component={MoreDurationCalls} />
        <Route path="date" component={DateSearch} />
    </Route>
)

export default routes