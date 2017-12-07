import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoreDurationCallsForm from '../components/layout/MoreDurationCallsForm';
import MoreDurationCallsResult from '../components/layout/MoreDurationCallsResult';
import {getMoreDurationCalls} from '../actions';

class MoreDurationCalls extends Component {
    constructor(...args) {
        super(...args)
    }    
    componentWillMount(){
        this.props.getMoreDurationCalls()
    }
    render(){
        return(
          <div>
            <h2>Top Duration Calls</h2>
            <MoreDurationCallsForm/>
            <br/>
            <MoreDurationCallsResult/>
          </div>
        )
    }
}
// export default MoreDurationCalls

function mapStateToProps(state){
    return {
        callsSearched: state.calls.callsSearched
    }
}
export default connect(mapStateToProps,{getMoreDurationCalls})(MoreDurationCalls)
