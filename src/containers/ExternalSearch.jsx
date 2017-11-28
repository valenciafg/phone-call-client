import React, {Component} from 'react'
import { connect } from 'react-redux'

import ExternalSearchForm from '../components/layout/ExternalSearchForm'
import CallSearchResult from '../components/layout/CallSearchResult'
import {getExternalPhoneDirectory} from '../actions';

class ExternalSearch extends React.Component {
    constructor(...args) {
        super(...args)
    }

    componentWillMount(){
        this.props.getExternalPhoneDirectory()
    }

    render(){
        return (
            <div>
                <h2>Search Calls By External Phone Name</h2>
                <ExternalSearchForm phonedirectory={this.props.externalphonedirectory}/>
                <CallSearchResult/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
      externalphonedirectory: state.calls.externalphonedirectory
    }
}
export default connect(mapStateToProps,{getExternalPhoneDirectory})(ExternalSearch)
