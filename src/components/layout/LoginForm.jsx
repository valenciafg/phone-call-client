import React, {Component} from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap'
//import LoginUser from '../../actions/LoginUser'
class LoginForm extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false
        }
        //this.onSubmit = this.onSubmit.bind(this)
        //this.onChange = this.onChange.bind(this)
    }
    onSubmit(e){
        e.preventDefault()
        console.log('adsadsad')
    }
    onchange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render(){
        const {username,password, errors,isLoading} = this.state
        return(
            <Form className="form-signin" onSubmit={(e)=>this.onSubmit(e)}>
                <FormGroup bsSize="large">
                    <FormControl type="text" placeholder="Usuario" />
                </FormGroup>
                <FormGroup bsSize="large">
                    <FormControl type="password" placeholder="Password" />
                </FormGroup>
                <FormGroup>
                    <Button type="submit" bsSize="large" bsStyle="primary" disabled={isLoading} block>Login</Button>
                </FormGroup>
            </Form>
        )
    }
}

export default LoginForm