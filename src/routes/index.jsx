import React from 'react'
import { IndexRoute, Route, Link, IndexRedirect, Redirect } from 'react-router'
/* Import component containers */
import App from '../containers/App'
import ExtensionSearch from '../containers/ExtensionSearch'
import OnlineCalls from '../containers/OnlineCalls'
import DateSearch from '../containers/DateSearch'
import NameSearch from '../containers/NameSearch'
import PhoneDirectory from '../containers/PhoneDirectory'
import Login from '../containers/Login'

const routes = (
    <Route path="/" component={App}>
        <IndexRoute  component={OnlineCalls} />
        <Route path="login" component={Login} />
        <Route path="extension" component={ExtensionSearch} />
        <Route path="name" component={NameSearch} />
        <Route path="directory" component={PhoneDirectory} />
        <Route path="date" component={DateSearch} />
    </Route>
)

export default routes