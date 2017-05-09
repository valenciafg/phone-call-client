import React, {Component} from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/layout/LoginForm'
class Login extends React.Component {
    constructor(...args) {
        super(...args)
    }    
    render(){
        return(
            <div className="row">
                <div className="col-sm-6 col-md-4 col-md-offset-4">
                    <div className="account-wall">
                    <h2 className="profile-img">Login</h2>
                    <LoginForm/>
                    </div>
                </div>                
            </div>
        )
    }
}

export default Login
