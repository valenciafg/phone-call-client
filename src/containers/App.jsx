import React, {Component} from 'react';
import { connect } from 'react-redux';

import CallList from '../components/CallList';

// import 'semantic-ui-css/semantic.css'

class App extends React.Component {
    constructor(...args) {
        super(...args)
    }
    render(){
        return (
            <div className="ui container">
                <h2>Phone Calls</h2>
                <CallList calls={this.props.calls}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        calls: state.calls
    }
}

export default connect(mapStateToProps,{})(App)