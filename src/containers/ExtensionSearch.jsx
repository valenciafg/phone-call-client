import React, {Component} from 'react'
import { connect } from 'react-redux'

import ExtensionSearchForm from '../components/layout/ExtensionSearchForm'
import CallSearchResult from '../components/layout/CallSearchResult'
import {getPhoneDirectory} from '../actions';

class ExtensionSearch extends React.Component {
    constructor(...args) {
        super(...args)
    }

    componentWillMount(){
        this.props.getPhoneDirectory()
    }

    render(){
        return (
            <div>
                <h2>Search Calls By Extension</h2>
                <ExtensionSearchForm phonedirectory={this.props.phonedirectory}/>
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
export default connect(mapStateToProps,{getPhoneDirectory})(ExtensionSearch)
