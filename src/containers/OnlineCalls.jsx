import React, {Component} from 'react';
import { connect } from 'react-redux';

import CallList from '../components/CallList';

import {getLastCalls} from '../actions';

class OnlineCalls extends Component {
    constructor(...args) {
        super(...args)
    }
    componentWillMount(){
        this.props.getLastCalls()
    }
    render(){
        return(
            <div>
                <h2>Online Phone Calls</h2>
                <CallList calls={this.props.calls}/>
            </div>
        )
    }
}
function mapStateToProps(state){
    // console.log('mapStateToProps getLastCalls',state.calls)
    return {
        calls: state.calls
    }
}
 export default connect(mapStateToProps,{getLastCalls})(OnlineCalls)
