import React, {Component} from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/NavBar';
import CallList from '../components/CallList';

// import 'semantic-ui-css/semantic.css'

class App extends React.Component {
    constructor(...args) {
        super(...args)
    }
    render(){
        return (
            <div>
                <NavBar/>
                <div className="container">
                    <h2>Phone Calls</h2>
                    <CallList calls={this.props.calls}/>
                </div>
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