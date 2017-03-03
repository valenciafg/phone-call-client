import React, {Component} from 'react'
import { connect } from 'react-redux'

import NameSearchForm from '../components/layout/NameSearchForm'
import CallSearchResult from '../components/layout/CallSearchResult'
import {getPhoneDirectory} from '../actions';

class NameSearch extends React.Component {
    constructor(...args) {
        super(...args)
    }

    componentWillMount(){
        this.props.getPhoneDirectory()
    }

    render(){
        return (
            <div>
                <h2>Search Calls By Name</h2>
                <NameSearchForm phonedirectory={this.props.phonedirectory}/>
                <CallSearchResult/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        phonedirectory: state.calls.phonedirectory
    }
}
export default connect(mapStateToProps,{getPhoneDirectory})(NameSearch)
