import React, {Component} from 'react'
import DateSearchForm from '../components/layout/DateSearchForm'
import CallSearchResult from '../components/layout/CallSearchResult'

export default class DateSearch extends React.Component {
    constructor(...args) {
        super(...args)
    }
    render(){
        return (
            <div>
                <h2>Search Calls By Date</h2>
                <DateSearchForm/>
                <br/>
                <CallSearchResult/>
            </div>
        )
    }
}
