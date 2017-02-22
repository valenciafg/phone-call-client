import React, {Component} from 'react';
import { connect } from 'react-redux';

import PhoneDirectoryList from '../components/PhoneDirectoryList';

import {getPhoneDirectory} from '../actions';

class PhoneDirectory extends React.Component {
    constructor(...args) {
        super(...args)
    }
    componentWillMount(){
        this.props.getPhoneDirectory()
    }
    render(){
        return(
            <div>
                <h2><i className="fa fa-address-book" aria-hidden="true"></i> Phone Directory</h2>
                <PhoneDirectoryList phonedirectory={this.props.phonedirectory}/>
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        phonedirectory: state.calls.phonedirectory
    }
}
export default connect(mapStateToProps,{getPhoneDirectory})(PhoneDirectory)
