import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoreCalledPhoneForm from '../components/layout/MoreCalledPhoneForm';
import MoreCalledPhoneResult from '../components/layout/MoreCalledPhoneResult';
import {getMoreCalledPhone} from '../actions';

class MoreCalledPhone extends Component {
    constructor(...args) {
        super(...args)
    }    
    componentWillMount(){
        this.props.getMoreCalledPhone()
    }
    render(){
        return(
          <div>
            <h2>Top Most Called Phones</h2>
            <MoreCalledPhoneForm/>
            <br/>
            <MoreCalledPhoneResult/>
          </div>
        )
    }
}
function mapStateToProps(state){
    return {
        callsSearched: state.calls.callsSearched
    }
}
export default connect(mapStateToProps,{getMoreCalledPhone})(MoreCalledPhone)
