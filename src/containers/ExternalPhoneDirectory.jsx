import React, {Component} from 'react';
import { connect } from 'react-redux';

import ExternalPhoneDirectoryList from '../components/ExternalPhoneDirectoryList';

import {getExternalPhoneDirectory} from '../actions';

class ExternalPhoneDirectory extends React.Component {
    constructor(...args) {
        super(...args)
    }
    componentWillMount(){
        this.props.getExternalPhoneDirectory()
    }
    render(){
        return(
            <div>
                <h2><i className="fa fa-address-book" aria-hidden="true"></i> External Phone Directory</h2>
                <ExternalPhoneDirectoryList phonedirectory={this.props.externalphonedirectory}/>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        externalphonedirectory: state.calls.externalphonedirectory
    }
}
export default connect(mapStateToProps,{getExternalPhoneDirectory})(ExternalPhoneDirectory)
